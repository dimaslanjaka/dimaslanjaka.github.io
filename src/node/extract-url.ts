const str = `https://www.typescriptlang.org/play?target=1&jsx=0#code/JYWwDg9gTgLgBAZwK5gKZQe4BDANnAMyghDgHJk0Ms8yBuAWACgBjCAOwXkyh12ABe6OAF447VAHdEKdDz4A6AMo1+QqAAoAlIybM2neOwgATVAlFwA2gG9EqXAQBc4pLnzYL2dgE8ANIjAAEb87ADmCC5WALpwnnG+MXAAvgE2zHD2ji7sbh5evn4ZgSHA4ZHWsfHePjFFTMnRusZmCFYADNEKmI6WLeYdTcz9bZ3dwaERfabmzTNtAIxdPQTTrVZLc+tL46Xla7PM+hxc9rx4gqgmlvIX6t2qlxojOkesJxC4qAq4EGEatzUVx0QA

https://www.typescriptlang.org/p l a y?target=1&jsx=0#code/JYWwDg9gTgLgBAZwK5gKZQe4BDANnAMyghDgHJk0Ms8yBuAWACgBjCAOwXkyh12ABe6OAF447VAHdEKdDz4A6AMo1+QqAAoAlIybM2neOwgATVAlFwA2gG9EqXAQBc4pLnzYL2dgE8ANIjAAEb87ADmCC5WALpwnnG+MXAAvgE2zHD2ji7sbh5evn4ZgSHA4ZHWsfHePjFFTMnRusZmCFYADNEKmI6WLeYdTcz9bZ3dwaERfabmzTNtAIxdPQTTrVZLc+tL46Xla7PM+hxc9rx4gqgmlvIX6t2qlxojOkesJxC4qAq4EGEatzUVx0QA`;

const regex = /https?:\/\/w{0,3}\w*?\.\w{2,3}\S*/gm;
Array.from(str.matchAll(regex)).forEach((m) => {
  console.log(m[0]);
});
