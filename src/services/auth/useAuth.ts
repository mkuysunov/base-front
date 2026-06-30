import { apiClient } from "@/config";

export const useLogin = () => {
  return apiClient.useMutation("post", "/client/auth/login", {
    retry: false,
  });
};

export const useGetMe = () => {
  return apiClient.useQuery("get", "/client/auth/me");
};

export const useLogout = () => {
  return apiClient.useMutation("post", "/client/auth/logout");
};

export const useUpdateAvatar = () => {
  return apiClient.useMutation("put", "/client/auth/me/avatar");
};

export const useDeleteAvatar = () => {
  return apiClient.useMutation("delete", "/client/auth/me/avatar");
};
