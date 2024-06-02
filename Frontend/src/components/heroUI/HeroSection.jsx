import React, { useState, useEffect } from "react";
import deletex from "../../assets/delete1.png";
import editx from "../../assets/edit1.png";
import save from "../../assets/save.png";
import add from "../../assets/add.png";
import cancel from "../../assets/cancel.png";
import axios from "axios";

const HeroSection = () => {
  const [name, setName] = useState("");
  const [contacts, setContacts] = useState([]);
  const [editingContactId, setEditingContactId] = useState(null);
  const [editedContact, setEditedContact] = useState({});
  const [newContact, setNewContact] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);

  // generate token using postman on route "localhost:3000/api/contact/login" if already account is created else use this localhost:3000/api/contact/signin
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NjQ2M2M5YTJkNWE2ZjA2ZWU3Mjg0ODYiLCJpYXQiOjE3MTU4NzkwNjZ9.c5obhgeSVMJaJDMS1Siz4Qj3RcVFV8h84qfNtBsooA8";

  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    axiosInstance
      .get("api/contact")
      .then((response) => {
        setContacts([...response.data]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleOnDelete = (contactId) => {
    axiosInstance
      .delete(`api/contact/delete/${contactId}`)
      .then((response) => {
        setContacts(contacts.filter((item) => item._id !== contactId));
        window.alert("Contact deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting contact:", error);
      });
  };

  const handleOnEdit = (contact) => {
    setEditingContactId(contact._id);
    setEditedContact({ ...contact });
  };

  const handleOnUpdate = (contactId) => {
    const formData = new FormData();
    formData.append("name", editedContact.name);
    formData.append("email", editedContact.email);
    formData.append("number", editedContact.number);
    if (editedContact.imageFile) {
      formData.append("image", editedContact.imageFile);
    }

    axiosInstance
      .put(`api/contact/update/${contactId}`, formData)
      .then((response) => {
        setContacts(
          contacts.map((item) =>
            item._id === contactId ? response.data : item
          )
        );
        setEditingContactId(null);
        setEditedContact({});
      })
      .catch((error) => {
        console.error("Error updating contact:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setEditedContact({
        ...editedContact,
        imageFile: files[0],
        image: URL.createObjectURL(files[0]), // For immediate preview
      });
    } else {
      setEditedContact({
        ...editedContact,
        [name]: value,
      });
    }
  };

  const handleAddChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewContact({
        ...newContact,
        imageFile: files[0],
        image: URL.createObjectURL(files[0]), // For immediate preview
      });
    } else {
      setNewContact({
        ...newContact,
        [name]: value,
      });
    }
  };

  const handleOnCreate = (e) => {
    e.preventDefault();
    if (!newContact.name || !newContact.email || !newContact.number) {
      window.alert("Please fill in all required fields");
      return;
    }
    const formData = new FormData();
    formData.append("name", newContact.name);
    formData.append("email", newContact.email);
    formData.append("number", newContact.number);
    if (newContact.imageFile) {
      formData.append("image", newContact.imageFile);
    }

    axiosInstance
      .post(`api/contact/create`, formData)
      .then((response) => {
        setContacts([...contacts, response.data]);
        setShowAddForm(false);
        setNewContact({});
      })
      .catch((error) => {
        console.error("Error creating contact:", error);
      });
  };

  const handleOnCancel = () => {
    setShowAddForm(false);
    setNewContact({});
  };

  return (
    <div>
      <ul role="list" className="divide-y divide-gray-100 divide">
        <input
          className="w-full"
          placeholder="search here"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        {contacts
          .filter((item) =>
            name === ""
              ? item
              : item.name.toLowerCase().includes(name.toLowerCase())
          )
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((person, i = 0) => (
            <li
              key={person.email}
              className="flex justify-between gap-x-6 py-5"
            >
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={person.image || `https://i.pravatar.cc/300?img=${i++}`}
                  alt=""
                />
                <div className="min-w-0 flex gap-8 items-center">
                  {editingContactId === person._id ? (
                    <>
                      <input
                        type="text"
                        name="name"
                        value={editedContact.name}
                        onChange={handleChange}
                        className="text-m font-semibold leading-6 text-gray-900"
                      />
                      <input
                        type="email"
                        name="email"
                        value={editedContact.email}
                        onChange={handleChange}
                        className="mt-1 truncate text-s leading-5 text-black"
                      />
                      <input
                        type="text"
                        name="number"
                        value={editedContact.number}
                        onChange={handleChange}
                        className="mt-1 truncate text-s leading-5 text-black"
                      />
                      {/* <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                      /> */}
                    </>
                  ) : (
                    <>
                      <p className="text-m font-semibold leading-6 text-gray-900">
                        {person.name}
                      </p>
                      <p className="mt-1 truncate text-s leading-5 text-black">
                        {person.email}
                      </p>
                      <p className="mt-1 truncate text-s leading-5 text-black">
                        {person.number}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:items-end flex-row gap-3 items-center">
                <img
                  src={deletex}
                  className="text-sm leading-6 text-gray-900 h-5 w-5 cursor-pointer"
                  onClick={() => handleOnDelete(person._id)}
                  alt="Delete contact"
                />
                {editingContactId === person._id ? (
                  <div className=" flex justify-evenly items-center">
                    <img
                      src={save}
                      className="text-sm leading-6 text-gray-900 h-5 w-5 cursor-pointer"
                      onClick={() => handleOnUpdate(person._id)}
                      alt="Save contact"
                    />
                    <img
                      src={cancel}
                      className="text-sm leading-6 text-gray-900 h-5 w-5 cursor-pointer"
                      onClick={() => {
                        setEditingContactId(null);
                        setEditedContact({});
                      }}
                      alt="Cancel edit contact"
                    />
                  </div>
                ) : (
                  <img
                    src={editx}
                    className="text-sm leading-6 text-gray-900 h-5 w-5 cursor-pointer"
                    onClick={() => handleOnEdit(person)}
                    alt="Edit contact"
                  />
                )}
              </div>
            </li>
          ))}
        {showAddForm ? (
          <li className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={newContact.image}
                alt=""
              />
              <div className="min-w-0 flex gap-8 items-center">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={newContact.name || ""}
                  onChange={handleAddChange}
                  className="text-m font-semibold leading-6 text-gray-900"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={newContact.email || ""}
                  onChange={handleAddChange}
                  className="mt-1 truncate text-s leading-5 text-black"
                />
                <input
                  type="text"
                  name="number"
                  placeholder="Phone Number"
                  value={newContact.number || ""}
                  onChange={handleAddChange}
                  className="mt-1 truncate text-s leading-5 text-black"
                />
                {/* <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleAddChange}
                /> */}
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:items-end flex-row gap-3 items-center">
              <img
                src={save}
                className="text-sm leading-6 text-gray-900 h-5 w-5 cursor-pointer"
                onClick={handleOnCreate}
                alt="Save new contact"
              />
              <img
                src={cancel}
                className="text-sm leading-6 text-gray-900 h-5 w-5 cursor-pointer"
                onClick={handleOnCancel}
                alt="Cancel add contact"
              />
            </div>
          </li>
        ) : (
          <li
            key={404}
            className="flex gap-x-6 py-5 items-center justify-center"
            onClick={() => setShowAddForm(true)}
          >
            <div className="flex min-w-0 gap-x-4 items-center justify-center cursor-pointer">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={add}
                alt="Add contact"
              />
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default HeroSection;
