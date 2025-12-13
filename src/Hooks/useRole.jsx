import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";


const useRole = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: role = "member", isLoading: roleLoading } = useQuery({
    queryKey: ['/users-role', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data?.role || 'member';
    }
  });

  return { role, roleLoading };
};

export default useRole;
