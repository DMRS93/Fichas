import { useNavigate } from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        Home
      </button>
      <button
        onClick={() => {
          navigate("/contacts/2");
        }}
      >
        Contacts
      </button>
      <button
        onClick={() => {
          navigate("/menu");
        }}
      >
        Menu
      </button>
    </div>
  );
}
