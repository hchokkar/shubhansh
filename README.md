# My Partner In Crime — Demo

Lightweight static page to present a romantic proposal/letter.

Quick run (requires Python 3):

1. Open a terminal in the project root.
2. Start a simple static server:

```bash
python3 -m http.server 8000
```

3. Open http://localhost:8000 in your browser.

Notes
- If you want background music, place an MP3 named `your-romantic-song.mp3` in the project root or update the `src` in `index.html`.
- You can also pick a local audio file from the page: click `Choose Music` and select an MP3/AAC file — then use `Play Music` to start playback. Note: browsers require a user interaction to start audio.
- Stop the server with Ctrl+C in the terminal.

Files
- `index.html` — main page
- `styles.css` — styles
- `script.js` — client behavior (countdown, evasive NO button, music toggle)
# shubhansh