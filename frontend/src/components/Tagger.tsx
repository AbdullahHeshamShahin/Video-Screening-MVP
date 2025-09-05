import { Stack, Button, Box, Typography } from "@mui/material";

const PRESET_TAGS = {
  Decision: ["✅ Proceed", "🔄 Revisit", "❌ Reject"],
  Skills: [
    "💻 Technical",
    "🗣️ Communication",
    "🎯 Problem Solving",
    "👥 Leadership",
  ],
  Experience: ["🌟 Senior", "📈 Mid-level", "🌱 Junior", "🎓 Entry-level"],
  Fit: ["🎯 Perfect Match", "🤔 Maybe", "❌ Not a Fit"],
  "Next Steps": [
    "📞 Phone Interview",
    "💼 On-site",
    "📝 Technical Test",
    "⏰ Follow-up",
  ],
};

export default function Tagger({
  onSelect,
}: {
  onSelect: (tag: string) => void;
}) {
  return (
    <Box>
      {Object.entries(PRESET_TAGS).map(([category, tags]) => (
        <Box key={category} sx={{ mb: 2 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 1, display: "block" }}
          >
            {category}:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {tags.map((tag) => (
              <Button
                key={tag}
                size="small"
                variant="outlined"
                onClick={() => onSelect(tag)}
                sx={{ mb: 1 }}
              >
                {tag}
              </Button>
            ))}
          </Stack>
        </Box>
      ))}
    </Box>
  );
}
