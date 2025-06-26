import { CurrentColumns } from "./components/CurrentSessions/CurrentColumns";
import { CompeleteColumns } from "./components/CompeleteSessions/CompeleteColumns";
import { DataTable } from "./components/data-table";
import { data } from "./data";

/**
 * Projects Component - Displays user sessions in tables
 *
 * Expected API Response Structure:
 * {
 *   "data": {
 *     "name": "John Doe",
 *     "email": "john@example.com",
 *     "phone": "1234567890",
 *     "country": "EG",
 *     "language": "arabic",
 *     "current_sessions": [
 *       {
 *         "id": 1,
 *         "title": "Session Title",
 *         "status": "in progress",
 *         "percentage": 60,
 *         "projectImage": "image_url",
 *         "assign": [...],
 *         "isFavourite": true
 *       }
 *     ],
 *     "compelete_sessions": [ // Note: API uses "compelete" (with typo)
 *       {
 *         "id": 2,
 *         "title": "Completed Session",
 *         "status": "completed",
 *         "percentage": 100,
 *         "projectImage": "image_url",
 *         "assign": [...],
 *         "isFavourite": false
 *       }
 *     ]
 *   }
 * }
 */
export default function Projects({ custom, user_data, isLoading }) {
  // Use data from API if available, otherwise fallback to static data
  const sessionsData = custom
    ? user_data?.compelete_sessions || user_data?.complete_sessions || data
    : user_data?.current_sessions || data;

  return (
    <DataTable
      data={sessionsData}
      columns={custom ? CompeleteColumns : CurrentColumns}
      custom={custom}
      isLoading={isLoading}
    />
  );
}
