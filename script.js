// script.js

function calculateWater() {
  const heightsInput = document.getElementById("heights").value;
  const heights = heightsInput.split(",").map(Number);
  const result = computeWaterUnits(heights);
  document.getElementById(
    "result"
  ).textContent = `Water units trapped: ${result}`;
  generateSVG(heights, result);
}

function computeWaterUnits(heights) {
  let left = 0,
    right = heights.length - 1;
  let leftMax = 0,
    rightMax = 0;
  let water = 0;

  while (left < right) {
    if (heights[left] < heights[right]) {
      if (heights[left] >= leftMax) {
        leftMax = heights[left];
      } else {
        water += leftMax - heights[left];
      }
      left++;
    } else {
      if (heights[right] >= rightMax) {
        rightMax = heights[right];
      } else {
        water += rightMax - heights[right];
      }
      right--;
    }
  }

  return water;
}

function generateSVG(heights, waterUnits) {
  const max = Math.max(...heights);
  const svgNS = "http://www.w3.org/2000/svg";
  const svgWidth = heights.length * 30;
  const svgHeight = max * 30 + 30; // Extra space for water
  const svgContainer = document.getElementById("svg-container");
  svgContainer.innerHTML = "";

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", svgWidth);
  svg.setAttribute("height", svgHeight);
  svgContainer.appendChild(svg);

  for (let i = 0; i < heights.length; i++) {
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", i * 30);
    rect.setAttribute("y", svgHeight - heights[i] * 30 - 30);
    rect.setAttribute("width", 30);
    rect.setAttribute("height", heights[i] * 30);
    rect.setAttribute("fill", "yellow");
    rect.setAttribute("stroke", "white");
    svg.appendChild(rect);
  }

  let left = 0,
    right = heights.length - 1;
  let leftMax = 0,
    rightMax = 0;

  while (left < right) {
    if (heights[left] < heights[right]) {
      if (heights[left] >= leftMax) {
        leftMax = heights[left];
      } else {
        const rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute("x", left * 30);
        rect.setAttribute("y", svgHeight - leftMax * 30 - 30);
        rect.setAttribute("width", 30);
        rect.setAttribute("height", (leftMax - heights[left]) * 30);
        rect.setAttribute("fill", "#0099e5");
        rect.setAttribute("stroke", "white");
        svg.appendChild(rect);
      }
      left++;
    } else {
      if (heights[right] >= rightMax) {
        rightMax = heights[right];
      } else {
        const rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute("x", right * 30);
        rect.setAttribute("y", svgHeight - rightMax * 30 - 30);
        rect.setAttribute("width", 30);
        rect.setAttribute("height", (rightMax - heights[right]) * 30);
        rect.setAttribute("fill", "#0099e5");
        rect.setAttribute("stroke", "white");
        svg.appendChild(rect);
      }
      right--;
    }
  }
}
