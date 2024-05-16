import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import s from "./Contact.module.css";
import { useDispatch } from "react-redux";

import { deleteContactsThunk } from "../../redux/contactsOps";

const Contact = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div className={s.container}>
      <div>
        <p className={s.text}>
          <FaUser className={s.icon} />
          {item.name}
        </p>
        <p className={s.text}>
          <FaPhone className={s.icon} />
          {item.number}
        </p>
      </div>
      <button
        className={s.deleteButton}
        type="button"
        onClick={() => dispatch(deleteContactsThunk(item.id))}
      >
        Delete
      </button>
    </div>
  );
};

export default Contact;
