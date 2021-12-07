const mainLeaf = document.getElementById("main-leaf");
const svg = document.getElementById("svg");

function createBranches() {
  const leafs = document.querySelectorAll(".leaf");

  for (let leaf of leafs) {
    if (leaf.id === "main-leaf") continue;

    // Create line element
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("class", "line");

    // Set position
    line.setAttribute("x1", mainLeaf.offsetLeft + mainLeaf.offsetWidth / 2);
    line.setAttribute("y1", mainLeaf.offsetTop + mainLeaf.offsetHeight / 2);
    line.setAttribute("x2", leaf.offsetLeft + leaf.offsetWidth / 2);
    line.setAttribute("y2", leaf.offsetTop + leaf.offsetHeight / 2);

    svg.appendChild(line);
  }
}

function updateBanches() {
  for (let branch of svg.querySelectorAll(".leaf")) {
    // Set position
    branch.setAttribute("x1", mainLeaf.offsetLeft + mainLeaf.offsetWidth / 2);
    branch.setAttribute("y1", mainLeaf.offsetTop + mainLeaf.offsetHeight / 2);
    branch.setAttribute("x2", leaf.offsetLeft + leaf.offsetWidth / 2);
    branch.setAttribute("y2", leaf.offsetTop + leaf.offsetHeight / 2);
  }
}

const skillArray = [
  {
    name: "Music",
    icon: "fa-music",
    color: "red",
  },
  {
    name: "Sports",
    icon: "fa-running",
    color: "green",
  },
];

const selectedSkills = [];

const skillList = document.getElementById("skillList");
for (let skill of skillArray) {
  const option = document.createElement("option");
  option.value = skill.name;
  option.text = skill.name;
  skillList.appendChild(option);
}

let right = false;

function addSkill() {
  const skillName = document.querySelector("input[name=skills]").value;
  const skill = skillArray.filter((skill) => skill.name === skillName)[0];
  const container = document.createElement("div");
  container.className =
    'd-flex justify-content-center leaf leaf-md leaf-bg-' + skill.color;
  container.style = 'top: 1vh;' + (right ? 'right' : 'left') +': 10%;';
  right = !right;

  const iconDiv = document.createElement("div");
  iconDiv.className = "align-self-center";
  const icon = document.createElement("i");
  icon.className = "fa " + skill.icon;

  iconDiv.appendChild(icon);
  container.appendChild(iconDiv);
  document.getElementById("skill-tree").prepend(container);

  selectedSkills.push(skill);

  createBranches();

  skillList.querySelectorAll('option[value=' + skillName + ']')[0].remove;

  window.sessionStorage.setItem('skills', selectedSkills);
}

window.onresize = () => {
  updateBanches();
};