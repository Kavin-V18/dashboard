
const BASE = "http://localhost:3001/users";

export const api = {

     getUsers: async () => (await fetch(BASE)).json(),
     getUser: async (id) => (await fetch(`${BASE}/${id}`)).json(),
     addUser: async (data) => fetch(BASE,
          {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(data)
          }),
     updateUser: async (id, data) => fetch(`${BASE}/${id}`,
          {
               method: "PUT", headers: { "Content-Type": "application/json" },
               body: JSON.stringify(data)
          }),
     deleteUser: async (id) => fetch(`${BASE}/${id}`,
          { method: "DELETE" }),
};