import { useAxiosFetch } from "@/hooks/useAxiosFetch";

const Profile = () => {
  const { data, error, loading } = useAxiosFetch("/users/me");
  if (loading) return <div>Loading...</div>; // show loader
  if (error) return <div>Error: {error.message}</div>; // show error
  if (!data) return <div>No user data found</div>; // handle empty data

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
      <p>Role: {data.role.name}</p>
      <p>Created At: {data.createdAt}</p>
      <p>Updated At: {data.updatedAt}</p>
    </div>
  );
};

export default Profile;
