import { useState } from "react";

export default function AddCustomer({ timerEnded }) {
    const [showForm, setShowForm] = useState(false);

    async function action(formData) {
        "use server";

        const entries = Object.fromEntries(formData.entries());

        const res = await fetch(`${import.meta.env.VITE_API_URL}/details/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(entries),
        });

        if (!res.ok) {
            throw new Error("Failed to add customer");
        }

        return await res.json();
    }

    // If timer is over, hide both button and form
    if (timerEnded) return null;

    return (
        <div style={{ textAlign: "center" }}>
            <button
                type="button"
                className="add-member-btn"
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? "Close" : "Add Member"}
            </button>

            {showForm && (
                <form action={action}>
                    <label htmlFor="name" className="form-label">Name</label>
                    <input name="name" type="text" placeholder="Name" id="name" />

                    <label htmlFor="contactNo" className="form-label">Contact</label>
                    <input name="contactNo" type="text" id="contactNo" />

                    <button type="submit">Add Customer</button>
                </form>
            )}
        </div>
    );
}
