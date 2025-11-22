/**
 * Hardcoded list of available images in /public/images/
 * This manifest is used for the image selector dropdown in the editor
 */

export const imageManifest: string[] = [
  // Add your image filenames here
  // Example:
  // "example1.jpg",
  // "example2.png",
  // "example3.webp",
  "vita.avif",
];

/**
 * Get the full path for an image
 */
export const getImagePath = (filename: string): string => {
  return `/images/${filename}`;
};

/**
 * Check if an image exists in the manifest
 */
export const isValidImage = (filename: string): boolean => {
  return imageManifest.includes(filename);
};
