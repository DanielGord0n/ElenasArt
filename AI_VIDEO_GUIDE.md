# How to Create "Come to Life" AI Videos

To fully realize the vision of paintings moving (like water flowing, trees swaying), you can use generative AI video tools. Here is a guide on how to do it and add them to your site.

## 1. Choose an AI Video Tool
There are several powerful AI tools that turn images into 5-10 second videos:

*   **Runway Gen-2 / Gen-3 Alpha**: Excellent for realistic movement. You can control specific areas to move (e.g., using "Motion Brush").
    *   *Website*: runwayml.com
*   **Luma Dream Machine**: Great for high-quality, realistic animations.
    *   *Website*: lumalabs.ai/dream-machine
*   **Kling AI**: A newer model capable of very high-quality video generation.
    *   *Website*: klingai.com
*   **Haiper**: Good for artistic styles.
    *   *Website*: haiper.ai

## 2. Generate the Video
1.  **Upload**: Upload your painting image (e.g., `Winter Bridge`).
2.  **Prompt**: Describe the motion you want.
    *   *Example for Winter Bridge*: "Light snow falling, subtle camera movement forward, cinematic, peaceful."
    *   *Example for Moonlit Sakura*: "Water rippling gently, sakura petals falling, moon glowing, subtle wind."
3.  **Motion Control (Important)**: If the tool has "Motion Brush" (like Runway), paint over the water or sky so only those parts move, keeping the bridge/trees stable. This looks the most essential for "bringing art to life."
4.  **Generate**: Create a few versions and pick the best one.

## 3. Prepare the File
1.  **Download**: Save the video (usually MP4).
2.  **Compress**: AI videos can be large. Use a tool like [HandBrake](https://handbrake.fr/) or an online compressor (e.g., formatting to WebM or optimized MP4) to keep the file size under 5MB if possible. This ensures the website loads fast.
3.  **Rename**: Name it matching your painting slug, e.g., `winter-bridge.mp4`.

## 4. Add to Website
1.  Move the `.mp4` file into the `public/paintings/` folder of your project (where the images are).
2.  Open the JSON file for that painting (e.g., `content/paintings/winter-bridge.json`).
3.  Add or update the `videoUrl` field:
    ```json
    {
      "slug": "winter-bridge",
      ...
      "videoUrl": "/paintings/winter-bridge.mp4"
    }
    ```
4.  The website is already built to detect this `videoUrl`. Once added, the "Play" button will automatically load your real video instead of the code-based animation!
