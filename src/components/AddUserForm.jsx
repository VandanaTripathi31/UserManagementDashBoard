import React, { useState } from "react";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { validateEmail, validateRequired } from "../utils/auth";
import { userService } from "../services/api";

const INITIAL = { name: "", email: "", phone: "", company: "" };

export default function AddUserForm({ isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e = {};
    if (!validateRequired(form.name)) e.name = "Name is required";
    if (!validateRequired(form.email)) e.email = "Email is required";
    else if (!validateEmail(form.email)) e.email = "Enter a valid email";
    if (!validateRequired(form.phone)) e.phone = "Phone is required";
    if (!validateRequired(form.company)) e.company = "Company is required";
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      await userService.create({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: { name: form.company },
      });
      setForm(INITIAL);
      onSuccess?.();
      onClose();
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setForm(INITIAL);
    setErrors({});
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New User">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Full Name"
            id="name"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />
          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Phone"
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 555 0100"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <Input
            label="Company"
            id="company"
            name="company"
            placeholder="Acme Corp"
            value={form.company}
            onChange={handleChange}
            error={errors.company}
          />
        </div>

        {errors.submit && (
          <div className="p-3 text-sm text-red-600 border border-red-200 rounded-xl bg-red-50 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
            {errors.submit}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {loading ? "Creating…" : "Create User"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
