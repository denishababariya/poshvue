import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

function Delete({ onConfirm }) {
  const [open, setOpen] = useState(false);

  const styles = {
    deleteBtn: {
      background: "#ef4444",
      color: "#fff",
      border: "none",
      padding: "8px 18px",
      borderRadius: 20,
      cursor: "pointer",
      fontSize: 14,
    },

    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },

    modal: {
      background: "#fff",
      width: 300,
      padding: "30px 20px",
      borderRadius: 24,
      textAlign: "center",
      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    },

    icon: {
      fontSize: 42,
      color: "#ef4444",
      marginBottom: 14,
    },

    stars: {
      color: "#ef4444",
      fontSize: 10,
      marginBottom: 10,
      letterSpacing: 6,
    },

    text: {
      fontSize: 14,
      fontWeight: 500,
      color: "#333",
      lineHeight: "1.5",
      marginBottom: 22,
    },

    confirmBtn: {
      background: "#ef4444",
      color: "#fff",
      border: "none",
      padding: "11px 0",
      borderRadius: 30,
      fontSize: 14,
      cursor: "pointer",
      width: "100%",
      marginBottom: 12,
    },

    cancelBtn: {
      background: "transparent",
      border: "none",
      color: "#ef4444",
      fontSize: 13,
      cursor: "pointer",
    },
  };

  return (
    <>
      {/* Trigger */}
      <button style={styles.deleteBtn} onClick={() => setOpen(true)}>
        Delete
      </button>

      {/* Modal */}
      {open && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            {/* Decorative */}
            <div style={styles.stars}>✕ ✕ ✕</div>

            {/* Icon */}
            <RiDeleteBinLine style={styles.icon} />

            {/* Text */}
            <p style={styles.text}>
              Are you sure you want to <br />
              delete your account?
            </p>

            {/* Actions */}
            <button
              style={styles.confirmBtn}
              onClick={() => {
                onConfirm && onConfirm();
                setOpen(false);
              }}
            >
              Yes, Delete
            </button>

            <button
              style={styles.cancelBtn}
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Delete;
