import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function useNotes() {
    return useQuery({
        queryKey: ["notes"],
        queryFn: async () => {
            const res = await axios.get(`${baseUrl}/api/notes`);
            return res.data;
        },
    }
);
}
