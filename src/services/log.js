import request from '@/utils/request';
import { addressHeader } from "@/utils/utils"
export async function getLogs(id, limit) {
    return request(`${addressHeader}/api/getLogs?id=${id}&limit=${limit}`);
}

