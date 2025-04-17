"use client";

import React, { useState } from "react";
import usePortal from "@/app/hooks/usePortal"; // Adjust import path as needed

const UsePortalExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  // Get the Portal component from the hook. Default ID: 'react-portal-root'
  const Portal = usePortal();

  // You can create multiple portals with different IDs if needed
  const NotificationPortal = usePortal({ id: "notification-portal-root" });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const showNotification = () => {
    setIsNotificationVisible(true);
    setTimeout(() => setIsNotificationVisible(false), 3000); // Hide after 3 seconds
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">usePortal Example</h2>
      <p className="text-sm mb-4">
        Renders children into a DOM node outside the parent component's
        hierarchy. Useful for modals, tooltips, notifications, etc.
      </p>

      <div className="space-x-2">
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Open Modal
        </button>
        <button
          onClick={showNotification}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Show Notification (in different portal)
        </button>
      </div>

      {/* Modal rendered using the default portal */}
      {isModalOpen && (
        <Portal>
          <div
            // Basic modal styling
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeModal} // Close on backdrop click
          >
            <div
              className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              <h3 className="text-lg font-medium mb-4">Modal Title</h3>
              <p className="mb-4">This content is rendered inside a portal.</p>
              <p className="text-xs mb-4">
                It's outside the main component's DOM structure but can still
                interact with its state.
              </p>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Close Modal
              </button>
            </div>
          </div>
        </Portal>
      )}

      {/* Notification rendered using a specific portal */}
      {isNotificationVisible && (
        <NotificationPortal>
          <div
            // Basic notification styling
            className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-md shadow-lg z-50"
          >
            Notification: Action completed!
          </div>
        </NotificationPortal>
      )}

      <p className="text-xs mt-6">
        Inspect the DOM tree. You'll find the modal content in a div with id
        <code>'react-portal-root'</code> (unless changed) and the notification
        in <code>'notification-portal-root'</code>, both likely direct children
        of <code>&lt;body&gt;</code>.
      </p>
    </div>
  );
};

export default UsePortalExample;
