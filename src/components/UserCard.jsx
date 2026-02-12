const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img
          src={photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
          alt="Profile"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        {age && <p>Age: {age}</p>}
        {gender && <p>Gender: {gender}</p>}
        {about && <p>About: {about}</p>}
      </div>
    </div>
  );
};

export default UserCard;