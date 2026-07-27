// Centralized API endpoints — read from environment variables
const API = {
  API_BASE: import.meta.env.VITE_API_BASE || "",
  PURCHASE_API: import.meta.env.VITE_PURCHASE_API || "",
  WORKFLOW_API: import.meta.env.VITE_WORKFLOW_API || "",
  PRO_API: import.meta.env.VITE_PRO_API || "",
  COLUMN_TYPES_API: import.meta.env.VITE_COLUMN_TYPES_API || "",
  DMS_UPLOAD: import.meta.env.VITE_DMS_UPLOAD || "",
  DMS_MAPPING_CHECK: import.meta.env.VITE_DMS_MAPPING_CHECK || "",
};

export default API;
