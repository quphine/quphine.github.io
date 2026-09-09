---
title: "Quartz Widget Master Test"
date: 2026-09-08
draft: false
tags:
  - quartz
  - test-page
  - documentation
  - design
aliases:
  - widget-demo
---

This page tests and showcases all built-in Quartz components, widgets, and interactive sidebars in a single note.

## Table of Contents Test

When you have multiple heading levels, Quartz automatically populates the **Table of Contents (TOC)** widget in the right sidebar.

### Sub-heading Alpha
This section creates nested entries in the Table of Contents to verify multi-level TOC hierarchy rendering.

### Sub-heading Beta
Here is another nested sub-heading to populate the right sidebar list.

---

## Interactive Hover Preview & Backlinks Test

Quartz uses bi-directional linking to connect your digital garden. Hover over or click these links to test **Popover Previews** and populate the **Backlinks** widget on target notes:

* Link to an existing note: [[welcome]]
* Link to your homepage: [[index]]
* Link with custom display text: [[Variational Autoencoders|Check out the VAE Guide]]

> **Backlink Check:** Once you navigate to [[Variational Autoencoders]], this page (*Quartz Widget Master Test*) will automatically appear in its **Backlinks** section in the sidebar.

---

## Code Block & Formatting Test

Testing standard block formatting, syntax highlighting, and copy button components:

```python
def test_quartz_widgets():
    widgets = ["Explorer", "Table of Contents", "Graph View", "Backlinks", "Recent Notes"]
    for widget in widgets:
        print(f"Widget active: {widget}")

if __name__ == "__main__":
    test_quartz_widgets()