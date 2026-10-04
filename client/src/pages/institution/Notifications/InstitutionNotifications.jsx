import { useMemo, useState } from "react";
import {
  Bell,
  BriefcaseBusiness,
  Building2,
  CheckCheck,
  ChevronDown,
  FileBarChart,
  GraduationCap,
  Info,
  Users,
} from "lucide-react";
import "./InstitutionNotifications.css";

const initialNotifications = [
  {
    id: 1,
    category: "Internships",
    title: "New internship opportunity posted by TechNova",
    description: "Frontend Developer Intern · 64 applications",
    time: "2 hours ago",
    icon: BriefcaseBusiness,
    color: "red",
    unread: true,
    sortValue: 2,
  },
  {
    id: 2,
    category: "Placements",
    title: "Placement drive scheduled",
    description: "TechCorp · 12 Oct 2025",
    time: "4 hours ago",
    icon: GraduationCap,
    color: "orange",
    unread: true,
    sortValue: 4,
  },
  {
    id: 3,
    category: "Students",
    title: "5 new student registrations",
    description: "Require verification",
    time: "6 hours ago",
    icon: Users,
    color: "blue",
    unread: true,
    sortValue: 6,
  },
  {
    id: 4,
    category: "Companies",
    title: "Collaboration request from CloudSoft",
    description: "Industry partnership request",
    time: "8 hours ago",
    icon: Building2,
    color: "violet",
    unread: true,
    sortValue: 8,
  },
  {
    id: 5,
    category: "Placements",
    title: "Application deadline reminder",
    description: "Backend Developer Intern · 3 days left",
    time: "10 hours ago",
    icon: BriefcaseBusiness,
    color: "red",
    unread: false,
    sortValue: 10,
  },
  {
    id: 6,
    category: "System",
    title: "Monthly report is ready",
    description: "September 2025 Placement Report",
    time: "1 day ago",
    icon: FileBarChart,
    color: "green",
    unread: false,
    sortValue: 24,
  },
  {
    id: 7,
    category: "Students",
    title: "Student profile verification completed",
    description: "12 student profiles were verified",
    time: "1 day ago",
    icon: CheckCheck,
    color: "green",
    unread: false,
    sortValue: 24,
  },
  {
    id: 8,
    category: "Companies",
    title: "New company joined your network",
    description: "DataTech · Data & Analytics",
    time: "2 days ago",
    icon: Building2,
    color: "cyan",
    unread: false,
    sortValue: 48,
  },
];

const tabs = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "students",
    label: "Students",
  },
  {
    id: "companies",
    label: "Companies",
  },
  {
    id: "placements",
    label: "Placements",
  },
  {
    id: "system",
    label: "System",
  },
];

const sortOptions = [
  {
    id: "latest",
    label: "Latest first",
  },
  {
    id: "oldest",
    label: "Oldest first",
  },
  {
    id: "unread",
    label: "Unread first",
  },
  {
    id: "read",
    label: "Read first",
  },
];

export default function InstitutionNotifications() {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState("latest");
  const [sortOpen, setSortOpen] = useState(false);

  const filteredNotifications = useMemo(() => {
    const filtered = notifications.filter((notification) => {
      const matchesTab =
        activeTab === "all" ||
        notification.category.toLowerCase() === activeTab;

      const matchesUnread =
        !showUnreadOnly || notification.unread;

      return matchesTab && matchesUnread;
    });

    return [...filtered].sort((a, b) => {
      if (sortOrder === "oldest") {
        return b.sortValue - a.sortValue;
      }

      if (sortOrder === "unread") {
        if (a.unread !== b.unread) {
          return a.unread ? -1 : 1;
        }

        return a.sortValue - b.sortValue;
      }

      if (sortOrder === "read") {
        if (a.unread !== b.unread) {
          return a.unread ? 1 : -1;
        }

        return a.sortValue - b.sortValue;
      }

      return a.sortValue - b.sortValue;
    });
  }, [activeTab, notifications, showUnreadOnly, sortOrder]);

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  const handleMarkAllAsRead = () => {
    if (unreadCount === 0) {
      return;
    }

    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    setSortOpen(false);
  };

  const currentSortLabel =
    sortOptions.find((option) => option.id === sortOrder)?.label ||
    "Latest first";

  return (
    <div className="institution-notifications-page">

      <section className="institution-notifications-header">
        <div>
          <p className="institution-notifications-eyebrow">
            ACTIVITY CENTER
          </p>

          <h1>Notifications</h1>

          <p>
            Stay updated with important activities
            and updates.
          </p>
        </div>

        <button
          type="button"
          className={`institution-mark-all ${
            unreadCount === 0 ? "disabled" : ""
          }`}
          onClick={handleMarkAllAsRead}
          disabled={unreadCount === 0}
        >
          <CheckCheck size={15} />
          {unreadCount === 0
            ? "All notifications read"
            : "Mark all as read"}
        </button>
      </section>
      <nav className="institution-notification-tabs">
        {tabs.map((tab) => {
          const count =
            tab.id === "all"
              ? notifications.length
              : notifications.filter(
                  (item) =>
                    item.category.toLowerCase() === tab.id
                ).length;

          return (
            <button
              key={tab.id}
              type="button"
              className={
                activeTab === tab.id
                  ? "active"
                  : ""
              }
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              <span>{count}</span>
            </button>
          );
        })}
      </nav>


      <section className="institution-notification-toolbar">
        <div className="institution-notification-summary">
          <Bell size={16} />

          <span>
            {unreadCount} unread notification
            {unreadCount !== 1 ? "s" : ""}
          </span>
        </div>

        <button
          type="button"
          className={`institution-unread-filter ${
            showUnreadOnly ? "active" : ""
          }`}
          onClick={() =>
            setShowUnreadOnly(!showUnreadOnly)
          }
        >
          <span>Unread only</span>

          <span className="institution-toggle-dot" />
        </button>

        <div className="institution-notification-sort">
          <button
            type="button"
            className={`institution-notification-filter ${
              sortOpen ? "open" : ""
            }`}
            onClick={() => setSortOpen(!sortOpen)}
            aria-haspopup="menu"
            aria-expanded={sortOpen}
          >
            {currentSortLabel}
            <ChevronDown
              size={13}
              className={sortOpen ? "rotated" : ""}
            />
          </button>

          {sortOpen && (
            <div
              className="institution-notification-sort-menu"
              role="menu"
            >
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  role="menuitem"
                  className={
                    sortOrder === option.id
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    handleSortChange(option.id)
                  }
                >
                  <span>{option.label}</span>

                  {sortOrder === option.id && (
                    <CheckCheck size={14} />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="institution-notification-list">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(
            (notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            )
          )
        ) : (
          <div className="institution-notification-empty">
            <div>
              <Bell size={25} />
            </div>

            <strong>
              No notifications found
            </strong>

            <span>
              There are no notifications matching
              your current filter.
            </span>
          </div>
        )}
      </section>

      <div className="institution-notification-footer">
        <Info size={15} />

        <span>
          Notifications will appear here when students,
          companies, placements or system activities
          require your attention.
        </span>
      </div>
    </div>
  );
}

function NotificationItem({ notification }) {
  const Icon = notification.icon;

  return (
    <article
      className={`institution-notification-item ${
        notification.unread ? "unread" : ""
      }`}
    >
      {/* Icon */}

      <div
        className={`institution-notification-icon ${notification.color}`}
      >
        <Icon size={18} />
      </div>

      {/* Content */}

      <div className="institution-notification-content">
        <div className="institution-notification-title-row">
          <h2>
            {notification.title}
          </h2>

          {notification.unread && (
            <span className="institution-unread-dot" />
          )}
        </div>

        <p>
          {notification.description}
        </p>
      </div>

      {/* Time */}

      <time className="institution-notification-time">
        {notification.time}
      </time>
    </article>
  );
}
