import { Button, Box } from "@mui/material";
import { submitForm } from "../../api/submissions";

export default function SubmitControls({ submissionId }) {
  return (
    <Box textAlign="center" mt={4}>
      <Button
        variant="contained"
        color="success"
        size="large"
        onClick={() => submitForm(submissionId)}
      >
        Submit FCAR
      </Button>
    </Box>
  );
}
