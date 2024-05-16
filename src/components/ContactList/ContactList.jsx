import { useSelector } from "react-redux";
import Contact from "./Contact";
import s from "./ContactList.module.css";
import { selectContacts } from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";

const ContactList = () => {
  const items = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={s.container}>
      <ul className={s.list}>
        {filteredItems.map((item) => {
          return (
            <li className={s.item} key={item.id}>
              <Contact item={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ContactList;
