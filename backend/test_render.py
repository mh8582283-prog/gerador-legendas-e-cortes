"""Regression tests for the standard subtitle renderer."""
from pathlib import Path
import unittest

from render import _build_cmd


class RenderCommandTests(unittest.TestCase):

    def test_rerender_request_can_reuse_existing_captions(self) -> None:
        from main import RenderRequest

        self.assertTrue(RenderRequest(reuse_ass=True).reuse_ass)

    def test_progress_bar_is_fast_then_finishes_with_video(self) -> None:
        from overlays import fake_progress

        duration = 100.0
        # 7x through 30%, 4x through 50%, then taper to 0.3x at the end.
        self.assertAlmostEqual(fake_progress(30.0, duration), 2.10 / 3.26, places=4)
        self.assertAlmostEqual(fake_progress(50.0, duration), 2.90 / 3.26, places=4)
        self.assertAlmostEqual(fake_progress(80.0, duration), 3.20 / 3.26, places=4)
        self.assertAlmostEqual(fake_progress(100.0, duration), 1.0, places=4)
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
