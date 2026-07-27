import { Routes, Route, Navigate } from "react-router-dom";
import DMSSetup from "./Setup/DMSSetup";
import DmsUpload from "./Upload/DMSUpload";

const DMSRouter = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="setup" replace />} />
      <Route path="setup" element={<DMSSetup />} />
      <Route path="upload" element={<DMSUpload />} />
      <Route path="*" element={<Navigate to="setup" replace />} />
    </Routes>
  );
};

export default DMSRouter;