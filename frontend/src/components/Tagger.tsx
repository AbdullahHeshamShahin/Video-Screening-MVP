import { Stack, Button } from "@mui/material";

const PRESET_TAGS = ["Proceed", "Revisit", "Reject"];

export default function Tagger({
  onSelect,
}: {
  onSelect: (tag: string) => void;
}) {
  return (
    <Stack direction="row" spacing={1}>
      {PRESET_TAGS.map((t) => (
        <Button
          key={t}
          size="small"
          variant="outlined"
          onClick={() => onSelect(t)}
        >
          {t}
        </Button>
      ))}
    </Stack>
  );
}
