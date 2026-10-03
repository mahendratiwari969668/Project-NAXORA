import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Info,
  Search,
  Settings,
  Target,
  UserCheck,
  X,
  BookOpen,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useMemo, useState } from "react";

import "./StudentNotifications.css";

/* =========================================================
   NOTIFICATION TABS
========================================================= */

const notificationTabs = [
  "All",
  "Applications",
  "Opportunities",
  "Profile",
  "System",
];

/* =========================================================
   INITIAL NOTIFICATIONS
========================================================= */

const initialNotifications = [
  {
    id: 1,
    type: "Applications",
    title: "Your application status has been updated",
    description:
      "Your application for Frontend Developer Intern is now under review.",
    time: "2 hours ago",
    icon: FileText,
    tone: "application",
    unread: true,
    targetPath: "/student/applications/1",
  },

  {
    id: 2,
    type: "Opportunities",
    title: "New opportunity matching your skills",
    description:
      "A new Frontend Developer internship has been posted that matches your profile.",
    time: "4 hours ago",
    icon: BriefcaseBusiness,
    tone: "opportunity",
    unread: true,
    targetPath: "/student/opportunities",
  },

  {
    id: 3,
    type: "Profile",
    title: "Profile completion reminder",
    description:
      "Complete your profile to present your skills and experience more clearly.",
    time: "6 hours ago",
    icon: UserCheck,
    tone: "profile",
    unread: true,
    targetPath: "/student/profile",
  },

  {
    id: 4,
    type: "Applications",
    title: "Interview stage reached",
    description:
      "Your Backend Developer application has moved to the interview stage.",
    time: "Yesterday",
    icon: CheckCircle2,
    tone: "interview",
    unread: false,
    targetPath: "/student/applications/2",
  },

  {
    id: 5,
    type: "Opportunities",
    title: "Opportunity deadline approaching",
    description:
      "The application deadline for Junior Web Developer is approaching.",
    time: "Yesterday",
    icon: Clock3,
    tone: "deadline",
    unread: false,
    targetPath: "/student/opportunities",
  },

  {
    id: 6,
    type: "Profile",
    title: "Add your education details",
    description:
      "Adding your education information will help improve your student profile.",
    time: "2 days ago",
    icon: BookOpen,
    tone: "profile",
    unread: false,
    targetPath: "/student/profile",
  },

  {
    id: 7,
    type: "System",
    title: "NEXORA learning recommendations updated",
    description:
      "Your learning section has new recommendations based on your skill profile.",
    time: "3 days ago",
    icon: Target,
    tone: "system",
    unread: false,
    targetPath: "/student/learning",
  },

  {
    id: 8,
    type: "System",
    title: "Welcome to your NEXORA workspace",
    description:
      "Your student workspace is ready. Start by completing your profile.",
    time: "5 days ago",
    icon: Info,
    tone: "system",
    unread: false,
    targetPath: "/student/dashboard",
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function StudentNotifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const [activeTab, setActiveTab] = useState("All");

  const [search, setSearch] = useState("");

  /* =======================================================
     UNREAD COUNT
  ======================================================= */

  const unreadCount = notifications.filter(
    (item) => item.unread
  ).length;

  /* =======================================================
     FILTER NOTIFICATIONS
  ======================================================= */

  const filteredNotifications = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return notifications.filter((notification) => {
      const matchesTab =
        activeTab === "All" ||
        notification.type === activeTab;

      const matchesSearch =
        !searchValue ||
        notification.title
          .toLowerCase()
          .includes(searchValue) ||
        notification.description
          .toLowerCase()
          .includes(searchValue);

      return matchesTab && matchesSearch;
    });
  }, [notifications, activeTab, search]);

  /* =======================================================
     MARK AS READ
  ======================================================= */

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              unread: false,
            }
          : notification
      )
    );
  };

  /* =======================================================
     MARK ALL AS READ
  ======================================================= */

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  /* =======================================================
     OPEN NOTIFICATION
     Read + Navigate
  ======================================================= */

  const openNotification = (notification) => {
    markAsRead(notification.id);

    if (notification.targetPath) {
      navigate(notification.targetPath);
    }
  };

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <div className="student-notifications-page">
      <main className="notifications-main">

        {/* =================================================
            PAGE HEADING
        ================================================= */}

        <section className="notifications-heading">
          <div>
            <span className="notifications-eyebrow">
              ACTIVITY CENTER
            </span>

            <h1>Notifications</h1>

            <p>
              Stay updated with important activity,
              opportunities and changes across your NEXORA
              workspace.
            </p>
          </div>

          <div className="notifications-heading-status">
            <Bell size={17} />

            {unreadCount > 0
              ? `${unreadCount} unread`
              : "All caught up"}
          </div>
        </section>


        {/* =================================================
            TOOLBAR
        ================================================= */}

        <section className="notifications-toolbar">

          <div className="notifications-search">
            <Search size={19} />

            <input
              type="text"
              placeholder="Search notifications..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <button
            type="button"
            className="notifications-mark-all"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <Check size={17} />
            Mark all as read
          </button>

        </section>


        {/* =================================================
            TABS
        ================================================= */}

        <section className="notifications-tabs-card">

          <div className="notifications-tabs">

            {notificationTabs.map((tab) => {
              const count =
                tab === "All"
                  ? notifications.length
                  : notifications.filter(
                      (item) => item.type === tab
                    ).length;

              return (
                <button
                  type="button"
                  key={tab}
                  className={
                    activeTab === tab
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTab(tab)
                  }
                >
                  {tab}
                  <span>{count}</span>
                </button>
              );
            })}

          </div>

        </section>


        {/* =================================================
            NOTIFICATION LIST
        ================================================= */}

        <section className="notifications-list">

          <div className="notifications-list-heading">

            <div>

              <span>
                {activeTab === "All"
                  ? "LATEST ACTIVITY"
                  : activeTab.toUpperCase()}
              </span>

              <h2>
                {activeTab === "All"
                  ? "Recent notifications"
                  : `${activeTab} notifications`}
              </h2>

            </div>

            {unreadCount > 0 && (
              <span className="notifications-unread-label">
                {unreadCount} unread
              </span>
            )}

          </div>


          {filteredNotifications.length > 0 ? (

            <div className="notification-items">

              {filteredNotifications.map(
                (notification) => {

                  const Icon = notification.icon;

                  return (
                    <article
                      key={notification.id}
                      className={`notification-item ${
                        notification.unread
                          ? "unread"
                          : ""
                      }`}

                      onClick={() =>
                        openNotification(notification)
                      }

                      role="button"
                      tabIndex={0}

                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter" ||
                          event.key === " "
                        ) {
                          event.preventDefault();

                          openNotification(
                            notification
                          );
                        }
                      }}
                    >

                      {/* =================================================
                          ICON
                      ================================================= */}

                      <div
                        className={`notification-icon ${notification.tone}`}
                      >
                        <Icon size={19} />
                      </div>


                      {/* =================================================
                          BODY
                      ================================================= */}

                      <div className="notification-body">

                        <div className="notification-title-row">

                          <h3>
                            {notification.title}
                          </h3>

                          {notification.unread && (
                            <span className="notification-new">
                              New
                            </span>
                          )}

                        </div>

                        <p>
                          {notification.description}
                        </p>

                        <div className="notification-meta">

                          <span>
                            <Clock3 size={14} />
                            {notification.time}
                          </span>

                          <span>
                            {notification.type}
                          </span>

                        </div>

                      </div>


                      {/* =================================================
                          ACTIONS
                      ================================================= */}

                      <div className="notification-actions">

                        {notification.unread && (
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();

                              markAsRead(
                                notification.id
                              );
                            }}
                            aria-label="Mark notification as read"
                            title="Mark as read"
                          >
                            <Check size={16} />
                          </button>
                        )}

                        <ChevronRight size={17} />

                      </div>

                    </article>
                  );
                }
              )}

            </div>

          ) : (

            <div className="notifications-empty">

              <div className="notifications-empty-icon">
                <Bell size={25} />
              </div>

              <h3>No notifications found</h3>

              <p>
                There are no notifications matching your
                current search or category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveTab("All");
                }}
              >
                View all notifications
              </button>

            </div>

          )}

        </section>


        {/* =================================================
            NOTIFICATION PREFERENCES
        ================================================= */}

        <section className="notifications-preference-card">

          <div className="notifications-preference-icon">
            <Settings size={21} />
          </div>

          <div>

            <span>
              NOTIFICATION PREFERENCES
            </span>

            <h3>
              Control how you stay updated
            </h3>

            <p>
              Manage your notification preferences and choose
              which activity you want to receive updates about.
            </p>

          </div>

          <Link to="/student/settings">
            Notification Settings
            <ArrowRightIcon />
          </Link>

        </section>

      </main>
    </div>
  );
}


/* =========================================================
   ARROW ICON
========================================================= */

function ArrowRightIcon() {
  return <ChevronRight size={17} />;
}