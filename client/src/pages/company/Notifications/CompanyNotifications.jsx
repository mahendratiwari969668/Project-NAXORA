import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  BellRing,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  MoreVertical,
  Search,
  Users,
  UserRoundCheck,
} from "lucide-react";

import "./CompanyNotifications.css";

const initialNotifications = [
  {
    id: 1,
    type: "application",
    title: "New application received",
    description:
      "Rahul Sharma applied for Frontend Developer Intern.",
    time: "2 hours ago",
    unread: true,
    icon: FileText,
  },
  {
    id: 2,
    type: "application",
    title: "Candidate shortlisted",
    description:
      "Priya Singh has been shortlisted for Backend Developer Intern.",
    time: "4 hours ago",
    unread: true,
    icon: UserRoundCheck,
  },
  {
    id: 3,
    type: "opportunity",
    title: "Interview scheduled",
    description:
      "Interview with Aman Kumar for Data Analyst Intern on 14 Oct 2025, 11:00 AM.",
    time: "6 hours ago",
    unread: true,
    icon: Clock3,
  },
  {
    id: 4,
    type: "college",
    title: "New collaboration request",
    description:
      "IIT (BHU) has sent a collaboration request.",
    time: "8 hours ago",
    unread: true,
    icon: Building2,
  },
  {
    id: 5,
    type: "opportunity",
    title: "Opportunity deadline reminder",
    description:
      "Frontend Developer Intern deadline is in 2 days.",
    time: "10 hours ago",
    unread: false,
    icon: BriefcaseBusiness,
  },
  {
    id: 6,
    type: "system",
    title: "Monthly report is ready",
    description:
      "Your September 2025 recruitment report is ready to download.",
    time: "1 day ago",
    unread: false,
    icon: FileText,
  },
  {
    id: 7,
    type: "application",
    title: "New candidate application",
    description:
      "Sneha Verma applied for UI/UX Designer Intern.",
    time: "1 day ago",
    unread: false,
    icon: FileText,
  },
  {
    id: 8,
    type: "college",
    title: "College collaboration accepted",
    description:
      "Delhi University accepted your collaboration request.",
    time: "2 days ago",
    unread: false,
    icon: Building2,
  },
];

const tabs = [
  { label: "All", value: "all" },
  { label: "Applications", value: "application" },
  { label: "Opportunities", value: "opportunity" },
  { label: "Colleges", value: "college" },
  { label: "System", value: "system" },
];

export default function CompanyNotifications() {
  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [menuId, setMenuId] = useState(null);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState("latest");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".company-notifications-sort")) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const filteredNotifications = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const filtered = notifications.filter((notification) => {
      const matchesTab =
        activeTab === "all" || notification.type === activeTab;

      const matchesSearch =
        !normalizedSearch ||
        notification.title.toLowerCase().includes(normalizedSearch) ||
        notification.description
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesUnread =
        !showUnreadOnly || notification.unread;

      return matchesTab && matchesSearch && matchesUnread;
    });

    return [...filtered].sort((a, b) => {
      if (sortOrder === "oldest") {
        return b.id - a.id;
      }

      if (sortOrder === "unread") {
        if (a.unread !== b.unread) {
          return Number(b.unread) - Number(a.unread);
        }
        return a.id - b.id;
      }

      return a.id - b.id;
    });
  }, [notifications, activeTab, search, showUnreadOnly, sortOrder]);

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );

    setMenuId(null);
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const removeNotification = (id) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id)
    );

    setMenuId(null);
  };

  const getTabCount = (value) => {
    if (value === "all") {
      return notifications.length;
    }

    return notifications.filter(
      (notification) => notification.type === value
    ).length;
  };

  return (
    <div className="company-notifications-page">
      {/* HEADER */}

      <header className="company-notifications-header">
        <div>
          <span className="company-notifications-eyebrow">
            <BellRing size={15} />
            Company Workspace
          </span>

          <h1>Notifications</h1>

          <p>
            Stay updated with applications, opportunities, colleges and
            company activity.
          </p>
        </div>

        <div className="company-notifications-header-actions">
          <button
            className={`company-notifications-unread-toggle ${
              showUnreadOnly ? "active" : ""
            }`}
            onClick={() => setShowUnreadOnly((current) => !current)}
          >
            <Bell size={16} />
            Unread only
          </button>

          <button
            className="company-notifications-mark-all"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <Check size={16} />
            Mark all as read
          </button>
        </div>
      </header>

      {/* SEARCH */}

      <div className="company-notifications-toolbar">
        <div className="company-notifications-search">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search candidates, jobs, colleges..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="company-notifications-sort">
          <button
            type="button"
            className={`company-notifications-filter-btn ${
              isSortOpen ? "active" : ""
            }`}
            onClick={() => setIsSortOpen((current) => !current)}
            aria-haspopup="menu"
            aria-expanded={isSortOpen}
          >
            <span>
              {sortOrder === "latest"
                ? "Latest"
                : sortOrder === "oldest"
                  ? "Oldest"
                  : "Unread first"}
            </span>
            <ChevronDown
              size={15}
              className={isSortOpen ? "rotated" : ""}
            />
          </button>

          {isSortOpen && (
            <div className="company-notifications-sort-menu" role="menu">
              <button
                type="button"
                className={sortOrder === "latest" ? "selected" : ""}
                onClick={() => {
                  setSortOrder("latest");
                  setIsSortOpen(false);
                }}
                role="menuitem"
              >
                Latest
                {sortOrder === "latest" && <Check size={14} />}
              </button>

              <button
                type="button"
                className={sortOrder === "oldest" ? "selected" : ""}
                onClick={() => {
                  setSortOrder("oldest");
                  setIsSortOpen(false);
                }}
                role="menuitem"
              >
                Oldest
                {sortOrder === "oldest" && <Check size={14} />}
              </button>

              <button
                type="button"
                className={sortOrder === "unread" ? "selected" : ""}
                onClick={() => {
                  setSortOrder("unread");
                  setIsSortOpen(false);
                }}
                role="menuitem"
              >
                Unread first
                {sortOrder === "unread" && <Check size={14} />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* TABS */}

      <div className="company-notifications-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={
              activeTab === tab.value ? "active" : ""
            }
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
            <span>{getTabCount(tab.value)}</span>
          </button>
        ))}
      </div>

      {/* NOTIFICATION LIST */}

      <section className="company-notifications-list">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => {
            const Icon = notification.icon;

            return (
              <article
                key={notification.id}
                className={`company-notification-item ${
                  notification.unread ? "unread" : ""
                }`}
              >
                <div
                  className={`company-notification-icon ${notification.type}`}
                >
                  <Icon size={17} strokeWidth={1.9} />
                </div>

                <div className="company-notification-content">
                  <div className="company-notification-title-row">
                    <h3>{notification.title}</h3>

                    {notification.unread && (
                      <span className="company-notification-unread-dot" />
                    )}
                  </div>

                  <p>{notification.description}</p>

                  <span className="company-notification-time">
                    {notification.time}
                  </span>
                </div>

                <div className="company-notification-actions">
                  <button
                    className="company-notification-menu-button"
                    onClick={() =>
                      setMenuId(
                        menuId === notification.id
                          ? null
                          : notification.id
                      )
                    }
                    aria-label="Notification actions"
                  >
                    <MoreVertical size={17} />
                  </button>

                  {menuId === notification.id && (
                    <div className="company-notification-menu">
                      {notification.unread && (
                        <button
                          onClick={() =>
                            markAsRead(notification.id)
                          }
                        >
                          <Check size={14} />
                          Mark as read
                        </button>
                      )}

                      {!notification.unread && (
                        <button
                          onClick={() =>
                            setMenuId(null)
                          }
                        >
                          <Bell size={14} />
                          Already read
                        </button>
                      )}

                      <button
                        className="danger"
                        onClick={() =>
                          removeNotification(notification.id)
                        }
                      >
                        Remove notification
                      </button>
                    </div>
                  )}
                </div>
              </article>
            );
          })
        ) : (
          <div className="company-notifications-empty">
            <div className="company-notifications-empty-icon">
              <Bell size={25} />
            </div>

            <h2>No notifications found</h2>

            <p>
              There are no notifications matching your current
              filters or search.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setActiveTab("all");
                setShowUnreadOnly(false);
                setSortOrder("latest");
                setIsSortOpen(false);
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* FOOTER */}

      <footer className="company-notifications-footer">
        <div>
          <Users size={15} />
          <span>
            Showing <strong>{filteredNotifications.length}</strong>{" "}
            notifications
          </span>
        </div>

        <span>
          <strong>{unreadCount}</strong> unread
        </span>
      </footer>
    </div>
  );
}