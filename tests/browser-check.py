# Compatibility entry point for the current production browser verification.
import runpy
from pathlib import Path
runpy.run_path(str(Path(__file__).with_name('overhaul-browser.py')), run_name='__main__')
