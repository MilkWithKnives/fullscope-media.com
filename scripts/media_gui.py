#!/usr/bin/env python3
"""
Quick local GUI to add images/videos to the portfolio and keep JSON in sync.
Usage:
  python scripts/media_gui.py
Notes:
  - Saves images to static/images/portfolio/<category>/
  - Saves videos to static/videos/portfolio/
  - Updates src/lib/data/portfolio-data.json
  - Local-only; no auth. Close the window when done.
"""

from __future__ import annotations

import json
import shutil
import tkinter as tk
from datetime import date
from pathlib import Path
from tkinter import filedialog, messagebox

# Project paths
ROOT = Path(__file__).resolve().parent.parent
DATA_PATH = ROOT / "src" / "lib" / "data" / "portfolio-data.json"
IMAGE_ROOT = ROOT / "static" / "images" / "portfolio"
VIDEO_ROOT = ROOT / "static" / "videos" / "portfolio"

CATEGORIES = [
    ("3d-tours", "3D Tours"),
    ("interior", "Interior Photography"),
    ("exterior", "Exterior Photography"),
    ("drone", "Drone & Aerial"),
    ("virtual-staging", "Virtual Staging"),
    ("floorplans", "Floorplans (Cubicasa)"),
    ("portraits", "Portraits & Headshots"),
]

VIDEO_EXT = {".mp4", ".mov", ".m4v", ".avi", ".mkv", ".webm"}


def ensure_dirs() -> None:
    IMAGE_ROOT.mkdir(parents=True, exist_ok=True)
    VIDEO_ROOT.mkdir(parents=True, exist_ok=True)
    for cat, _ in CATEGORIES:
        (IMAGE_ROOT / cat).mkdir(parents=True, exist_ok=True)
    if not DATA_PATH.exists():
        DATA_PATH.parent.mkdir(parents=True, exist_ok=True)
        DATA_PATH.write_text("[]", encoding="utf-8")


def load_items() -> list[dict]:
    try:
        return json.loads(DATA_PATH.read_text(encoding="utf-8"))
    except Exception:
        return []


def save_items(items: list[dict]) -> None:
    DATA_PATH.write_text(json.dumps(items, indent=2), encoding="utf-8")


def slugify(name: str) -> str:
    cleaned = "".join(ch if ch.isalnum() else "-" for ch in name.lower())
    while "--" in cleaned:
        cleaned = cleaned.replace("--", "-")
    return cleaned.strip("-") or "media"


class MediaGui:
    def __init__(self) -> None:
        ensure_dirs()
        self.items = load_items()
        self.file_path: Path | None = None

        self.root = tk.Tk()
        self.root.title("Full Scope Media — Portfolio Manager")

        # Form fields
        self.category_var = tk.StringVar(value=CATEGORIES[0][0])
        self.title_var = tk.StringVar()
        self.desc_var = tk.StringVar()
        self.client_var = tk.StringVar()
        self.results_var = tk.StringVar()
        self.date_var = tk.StringVar(value=str(date.today()))
        self.tags_var = tk.StringVar()
        self.file_label_var = tk.StringVar(value="No file selected")
        self.status_var = tk.StringVar(value="Ready")

        self.build_ui()
        self.refresh_list()

    def build_ui(self) -> None:
        pad = {"padx": 8, "pady": 4, "sticky": "ew"}

        frame = tk.Frame(self.root)
        frame.grid(row=0, column=0, sticky="nsew")
        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(0, weight=1)

        tk.Label(frame, text="Category").grid(row=0, column=0, **pad)
        tk.OptionMenu(frame, self.category_var, *[c[0] for c in CATEGORIES]).grid(
            row=0, column=1, **pad
        )

        tk.Label(frame, text="Title").grid(row=1, column=0, **pad)
        tk.Entry(frame, textvariable=self.title_var).grid(row=1, column=1, **pad)

        tk.Label(frame, text="Description").grid(row=2, column=0, **pad)
        tk.Entry(frame, textvariable=self.desc_var).grid(row=2, column=1, **pad)

        tk.Label(frame, text="Client").grid(row=3, column=0, **pad)
        tk.Entry(frame, textvariable=self.client_var).grid(row=3, column=1, **pad)

        tk.Label(frame, text="Results").grid(row=4, column=0, **pad)
        tk.Entry(frame, textvariable=self.results_var).grid(row=4, column=1, **pad)

        tk.Label(frame, text="Date (YYYY-MM-DD)").grid(row=5, column=0, **pad)
        tk.Entry(frame, textvariable=self.date_var).grid(row=5, column=1, **pad)

        tk.Label(frame, text="Tags (comma-separated)").grid(row=6, column=0, **pad)
        tk.Entry(frame, textvariable=self.tags_var).grid(row=6, column=1, **pad)

        tk.Button(frame, text="Choose file", command=self.choose_file).grid(
            row=7, column=0, **pad
        )
        tk.Label(frame, textvariable=self.file_label_var, anchor="w").grid(
            row=7, column=1, **pad
        )

        tk.Button(frame, text="Add to portfolio", command=self.add_item).grid(
            row=8, column=0, columnspan=2, padx=8, pady=8, sticky="ew"
        )

        self.listbox = tk.Listbox(frame, height=12)
        self.listbox.grid(row=9, column=0, columnspan=2, padx=8, pady=8, sticky="nsew")
        frame.rowconfigure(9, weight=1)

        tk.Label(frame, textvariable=self.status_var, anchor="w").grid(
            row=10, column=0, columnspan=2, padx=8, pady=4, sticky="ew"
        )

    def choose_file(self) -> None:
        path = filedialog.askopenfilename(
            title="Choose image or video",
            filetypes=[
                ("Media", "*.jpg *.jpeg *.png *.webp *.gif *.mp4 *.mov *.m4v *.avi *.mkv *.webm"),
                ("All files", "*.*"),
            ],
        )
        if path:
            self.file_path = Path(path)
            self.file_label_var.set(self.file_path.name)

    def add_item(self) -> None:
        if not self.file_path or not self.file_path.exists():
            messagebox.showerror("Missing file", "Please choose a file.")
            return

        cat = self.category_var.get()
        title = self.title_var.get().strip() or self.file_path.stem
        desc = self.desc_var.get().strip()
        client = self.client_var.get().strip()
        results = self.results_var.get().strip()
        tags = [t.strip() for t in self.tags_var.get().split(",") if t.strip()]
        date_str = self.date_var.get().strip() or str(date.today())

        ext = self.file_path.suffix.lower()
        is_video = ext in VIDEO_EXT
        dest_dir = VIDEO_ROOT if is_video else IMAGE_ROOT / cat
        dest_dir.mkdir(parents=True, exist_ok=True)

        safe_name = f"{slugify(title)}{ext}"
        dest_path = dest_dir / safe_name
        # Avoid overwrite collisions
        counter = 1
        while dest_path.exists():
            dest_path = dest_dir / f"{slugify(title)}-{counter}{ext}"
            counter += 1

        shutil.copy2(self.file_path, dest_path)

        items = load_items()
        next_id = max([int(i.get("id", 0)) for i in items] + [0]) + 1
        public_path = (
            f"/videos/portfolio/{dest_path.name}"
            if is_video
            else f"/images/portfolio/{cat}/{dest_path.name}"
        )

        new_item = {
            "id": next_id,
            "title": title,
            "category": cat,
            "description": desc,
            "image": None if is_video else public_path,
            "video": public_path if is_video else None,
            "tags": tags,
            "date": date_str,
            "client": client,
            "results": results,
        }

        items.append(new_item)
        save_items(items)
        self.items = items
        self.refresh_list()

        self.status_var.set(f"Added: {title}")
        messagebox.showinfo("Saved", f"Saved and copied to {dest_path}")

    def refresh_list(self) -> None:
        self.listbox.delete(0, tk.END)
        for item in sorted(self.items, key=lambda x: x.get("id", 0), reverse=True):
            self.listbox.insert(
                tk.END, f"#{item.get('id')} [{item.get('category')}] {item.get('title')}"
            )

    def run(self) -> None:
        self.root.mainloop()


if __name__ == "__main__":
    gui = MediaGui()
    gui.run()
