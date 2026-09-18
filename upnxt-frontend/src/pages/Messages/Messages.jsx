import { useState } from "react";
import {
  Bell,
  Building2,
  CheckCheck,
  ChevronRight,
  MessageCircle,
  Search,
} from "lucide-react";

import "./Messages.css";

const initialMessages = [
  {
    id: 1,
    company: "UPnxt Careers",
    title: "Welcome to UPnxt",
    message:
      "Your career journey starts here. Complete your profile and explore opportunities that match your skills.",
    time: "Today",
    unread: true,
  },
  {
    id: 2,
    company: "Recruiter Updates",
    title: "Keep your profile updated",
    message:
      "Adding your latest skills and experience can help recruiters understand your profile better.",
    time: "Yesterday",
    unread: true,
  },
  {
    id: 3,
    company: "Career Team",
    title: "New assessment available",
    message:
      "A new skill assessment is available for you. Test your knowledge and build your career profile.",
    time: "2 days ago",
    unread: false,
  },
];

function Messages() {
  const [messages, setMessages] =
    useState(initialMessages);

  const [selected, setSelected] =
    useState(messages[0]);

  const [search, setSearch] =
    useState("");

  const filteredMessages =
    messages.filter((message) =>
      `${message.company} ${message.title}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const openMessage = (message) => {
    setSelected(message);

    setMessages((previous) =>
      previous.map((item) =>
        item.id === message.id
          ? { ...item, unread: false }
          : item
      )
    );
  };

  const unreadCount =
    messages.filter(
      (message) => message.unread
    ).length;

  return (
    <div className="messages-page">

      <section className="messages-header">

        <div>
          <p>YOUR INBOX</p>
          <h1>Messages</h1>
          <span>
            Stay connected with recruiters
            and career updates.
          </span>
        </div>

        <div className="messages-count">
          <Bell size={19} />
          {unreadCount} unread
        </div>

      </section>

      <div className="messages-layout">

        <aside className="messages-list">

          <div className="message-search">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search messages"
            />
          </div>

          {filteredMessages.map(
            (message) => (
              <button
                key={message.id}
                className={`message-preview ${
                  selected?.id === message.id
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  openMessage(message)
                }
              >

                <div className="message-avatar">
                  <Building2 size={19} />
                </div>

                <div className="message-preview-content">

                  <div>
                    <strong>
                      {message.company}
                    </strong>

                    {message.unread && (
                      <span className="unread-dot" />
                    )}
                  </div>

                  <h3>
                    {message.title}
                  </h3>

                  <p>
                    {message.message}
                  </p>

                </div>

                <ChevronRight size={15} />

              </button>
            )
          )}

        </aside>

        <main className="message-detail">

          {selected ? (
            <>
              <div className="message-detail-header">

                <div className="message-large-avatar">
                  <Building2 size={25} />
                </div>

                <div>
                  <strong>
                    {selected.company}
                  </strong>

                  <span>
                    {selected.time}
                  </span>
                </div>

              </div>

              <div className="message-body">

                <div className="message-title-icon">
                  <MessageCircle size={21} />
                </div>

                <p className="message-label">
                  MESSAGE
                </p>

                <h2>
                  {selected.title}
                </h2>

                <p>
                  {selected.message}
                </p>

                <div className="message-read">
                  <CheckCheck size={16} />
                  Message viewed
                </div>

              </div>
            </>
          ) : (
            <div className="message-no-selection">
              Select a message
            </div>
          )}

        </main>

      </div>

    </div>
  );
}

export default Messages;