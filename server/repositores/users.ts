export async function getUser(
  username: string,
  password: string,
): Promise<object> {
  if (username === "admin" && password === "admin") {
    return { id: "1", name: "Admin", role: "admin", login: true };
  } else if (username === "employee" && password === "employee") {
    return { id: "2", name: "Employee", role: "employee", login: true };
  } else {
    return { login: false };
  }
}
