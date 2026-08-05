"""Regression tests for the standard subtitle renderer."""
from pathlib import Path
import unittest

from render import _build_cmd


class RenderCommandTests(unittest.TestCase):
    def test_highlight_uses_blur_in_standard_export(self) -> None:
        cmd = _build_cmd(
            Path("input.mp4"), Path("captions.ass"), Path("output.mp4"),
            False, 10.0, 1080, 1920,
            [{"start": 2.0, "end": 3.0, "text": "momento"}],
        )
        self.assertIn("-filter_complex", cmd)
        graph = cmd[cmd.index("-filter_complex") + 1]
        self.assertIn("gblur", graph)
        self.assertIn("between(t,1.880,3.250)", graph)
        # The ASS subtitles are applied after the source-video blur.
        self.assertLess(graph.index("gblur"), graph.index("ass="))

    def test_plain_export_keeps_lightweight_video_filter(self) -> None:
        cmd = _build_cmd(
            Path("input.mp4"), Path("captions.ass"), Path("output.mp4"),
            False, 10.0, 1080, 1920,
        )
        self.assertIn("-vf", cmd)
        self.assertNotIn("-filter_complex", cmd)


if __name__ == "__main__":
    unittest.main()
