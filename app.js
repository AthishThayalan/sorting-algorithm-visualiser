let sort = "";
let message;
let generateArrayClicked = false;

function updateMessage() {
  if (sort === "") {
    message =
      "Welcome to my sorting algorithm!\n\nI thought I'd make this, as I've just delved into Data Structures & Algorithms and wanted to consolidate my learnings, so enjoy :)";
  } else if (sort === "bubble") {
    message =
      "Bubble sort!\n\nBubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.";
  } else if (sort === "insertion") {
    message =
      "Insertion sort!\n\nInsertion sort is a simple sorting algorithm that builds the final sorted array (or list) one item at a time. It iterates through the input elements, shifting them one position to the right if they are greater than the current value being compared.";
  } else if (sort === "merge") {
    message =
      "Merge sort!\n\nMerge sort is a divide-and-conquer algorithm that divides the input array into two halves, sorts each half separately, and then merges the sorted halves to produce the final sorted array.";
  } else if (sort === "selection") {
    message =
      "Selection sort!\n\nSelection sort is an in-place comparison sorting algorithm. It divides the input list into two parts: the sublist of items already sorted and the sublist of items remaining to be sorted. It repeatedly finds the minimum element from the unsorted sublist and swaps it with the first element of the unsorted sublist.";
  } else if (sort === "quick") {
    message =
      "Quick sort!\n\nQuick sort is a highly efficient sorting algorithm based on the divide-and-conquer approach. It selects a pivot element and partitions the other elements into two subarrays according to whether they are less than or greater than the pivot. The subarrays are then recursively sorted. This process continues until the entire array is sorted.";
  }
  document.getElementById("infoBox").innerText = message;
}

async function generateArray() {
  const arrayContainer = document.getElementById("arrayContainer");
  sort = "";
  updateMessage();
  arrayContainer.innerHTML = "";
  const arraySize = 20;
  const array = [];
  for (let i = 0; i < arraySize; i++) {
    array.push(Math.floor(Math.random() * 100) + 1);
  }
  for (let i = 0; i < arraySize; i++) {
    const arrayBar = document.createElement("div");
    arrayBar.classList.add("array-bar");
    arrayBar.style.height = `${array[i] * 3}px`;
    arrayContainer.appendChild(arrayBar);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

async function bubbleSort() {
  sort = "bubble";
  updateMessage();
  const arrayBars = arrayContainer.querySelectorAll(".array-bar");
  for (let i = 0; i < arrayBars.length; i++) {
    for (let j = 0; j < arrayBars.length - 1 - i; j++) {
      arrayBars[j].style.backgroundColor = "red";
      arrayBars[j + 1].style.backgroundColor = "red";
      await new Promise((resolve) => setTimeout(resolve, 50));
      if (
        parseInt(arrayBars[j].style.height) >
        parseInt(arrayBars[j + 1].style.height)
      ) {
        let tempHeight = arrayBars[j].style.height;
        arrayBars[j].style.height = arrayBars[j + 1].style.height;
        arrayBars[j + 1].style.height = tempHeight;
      }
      arrayBars[j].style.backgroundColor = "dodgerblue";
      arrayBars[j + 1].style.backgroundColor = "dodgerblue";
    }
  }
  console.log("BOOBLE");
}

async function insertionSort() {
  sort = "insertion";
  updateMessage();
  const arrayBars = arrayContainer.querySelectorAll(".array-bar");
  for (let i = 1; i < arrayBars.length; i++) {
    let j = i;

    while (
      j > 0 &&
      parseInt(arrayBars[j].style.height) <
        parseInt(arrayBars[j - 1].style.height)
    ) {
      arrayBars[j].style.backgroundColor = "red";
      arrayBars[j - 1].style.backgroundColor = "red";
      let tempHeight = arrayBars[j].style.height;
      arrayBars[j].style.height = arrayBars[j - 1].style.height;
      arrayBars[j - 1].style.height = tempHeight;
      arrayBars[j].style.backgroundColor = "dodgerblue";

      j--;
      if (j > 0) {
        height1 = parseInt(arrayBars[j].style.height);
        height2 = parseInt(arrayBars[j - 1].style.height);
      }

      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    arrayBars[j].style.backgroundColor = "dodgerblue";
  }
  console.log("insert");
}

async function mergeSort() {
  sort = "merge";
  updateMessage();
  const arrayBars = arrayContainer.querySelectorAll(".array-bar");
  await mergeSortRecursive(arrayBars, 0, arrayBars.length - 1);
}

async function mergeSortRecursive(arrayBars, start, end) {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);

    await mergeSortRecursive(arrayBars, start, mid);
    await mergeSortRecursive(arrayBars, mid + 1, end);

    await merge(arrayBars, start, mid, end);
  }
}

async function merge(arrayBars, start, mid, end) {
  const leftSize = mid - start + 1;
  const rightSize = end - mid;

  const leftArray = new Array(leftSize);
  const rightArray = new Array(rightSize);

  for (let i = 0; i < leftSize; i++) {
    leftArray[i] = parseInt(arrayBars[start + i].style.height);
  }
  for (let j = 0; j < rightSize; j++) {
    rightArray[j] = parseInt(arrayBars[mid + 1 + j].style.height);
  }

  let i = 0;
  let j = 0;
  let k = start;

  while (i < leftSize && j < rightSize) {
    arrayBars[start + i].style.backgroundColor = "red";
    arrayBars[mid + 1 + j].style.backgroundColor = "red";
    await new Promise((resolve) => setTimeout(resolve, 100));

    arrayBars[start + i].style.backgroundColor = "dodgerblue";
    arrayBars[mid + 1 + j].style.backgroundColor = "dodgerblue";

    if (leftArray[i] <= rightArray[j]) {
      arrayBars[k].style.height = `${leftArray[i]}px`;
      i++;
    } else {
      arrayBars[k].style.height = `${rightArray[j]}px`;
      j++;
    }
    k++;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  while (i < leftSize) {
    arrayBars[k].style.height = `${leftArray[i]}px`;
    i++;
    k++;

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  while (j < rightSize) {
    arrayBars[k].style.height = `${rightArray[j]}px`;
    j++;
    k++;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

async function selectionSort() {
  sort = "selection";
  updateMessage();
  const arrayBars = arrayContainer.querySelectorAll(".array-bar");
  const n = arrayBars.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    arrayBars[minIndex].style.backgroundColor = "red";

    for (let j = i + 1; j < n; j++) {
      arrayBars[j].style.backgroundColor = "red";

      await new Promise((resolve) => setTimeout(resolve, 100));

      arrayBars[j].style.backgroundColor = "dodgerblue";

      if (
        parseInt(arrayBars[j].style.height) <
        parseInt(arrayBars[minIndex].style.height)
      ) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      arrayBars[i].style.backgroundColor = "dodgerblue";
      arrayBars[minIndex].style.backgroundColor = "dodgerblue";

      await new Promise((resolve) => setTimeout(resolve, 100));

      let tempHeight = arrayBars[i].style.height;
      arrayBars[i].style.height = arrayBars[minIndex].style.height;
      arrayBars[minIndex].style.height = tempHeight;

      arrayBars[i].style.backgroundColor = "dodgerblue";
      arrayBars[minIndex].style.backgroundColor = "dodgerblue";
    }

    arrayBars[minIndex].style.backgroundColor = "dodgerblue";
  }
  console.log("Selection Sort");
}

async function quickSort() {
  sort = "quick";
  updateMessage();
  const arrayBars = arrayContainer.querySelectorAll(".array-bar");
  await quickSortRecursive(arrayBars, 0, arrayBars.length - 1);
}

async function quickSortRecursive(arrayBars, low, high) {
  if (low < high) {
    const pivotIndex = await partition(arrayBars, low, high);

    await quickSortRecursive(arrayBars, low, pivotIndex - 1);
    await quickSortRecursive(arrayBars, pivotIndex + 1, high);
  }
}

async function partition(arrayBars, low, high) {
  const pivot = parseInt(arrayBars[high].style.height);
  arrayBars[high].style.backgroundColor = "green";
  let i = low - 1;

  arrayBars[low].style.backgroundColor = "orange";

  arrayBars[high].style.backgroundColor = "yellow";

  for (let j = low; j < high; j++) {
    arrayBars[j].style.backgroundColor = "red";
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (parseInt(arrayBars[j].style.height) < pivot) {
      i++;

      const tempHeight = arrayBars[i].style.height;
      arrayBars[i].style.height = arrayBars[j].style.height;
      arrayBars[j].style.height = tempHeight;

      arrayBars[j].style.backgroundColor = "dodgerblue";
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  const tempHeight = arrayBars[i + 1].style.height;
  arrayBars[i + 1].style.height = arrayBars[high].style.height;
  arrayBars[high].style.height = tempHeight;

  arrayBars[high].style.backgroundColor = "dodgerblue";
  arrayBars[low].style.backgroundColor = "dodgerblue";

  for (let k = low + 1; k < high; k++) {
    arrayBars[k].style.backgroundColor = "dodgerblue";
  }

  return i + 1;
}
