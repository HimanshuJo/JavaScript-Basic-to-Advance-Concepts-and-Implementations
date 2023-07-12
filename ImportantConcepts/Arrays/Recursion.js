/*
Imagine, we have a company. The staff structure can be presented as an object:

let company = {
  sales: [{
    name: 'John',
    salary: 1000
  }, {
    name: 'Alice',
    salary: 1600
  }],

  development: {
    sites: [{
      name: 'Peter',
      salary: 2000
    }, {
      name: 'Alex',
      salary: 1800
    }],

    internals: [{
      name: 'Jack',
      salary: 1300
    }]
  }
};

In other words, a company has departments.

A department may have an array of staff. 

	For instance, sales department has 2 employees: 

		John and Alice.

Or a department may split into subdepartments, like development has two branches: 
	
	sites and internals. 

	Each of them has their own staff.

It is also possible that when a subdepartment grows, it divides into subsubdepartments (or teams).

For instance, the sites department in the future may be split into teams for siteA and siteB. 

And they, potentially, can split even more. That’s not on the picture, just something to have in mind.

Now let’s say we want a function to get the sum of all salaries. How can we do that?

An iterative approach is not easy, because the structure is not simple. 

The first idea may be to make a for loop over company with nested subloop over 1st level departments. 

But then we need more nested subloops to iterate over the staff in 2nd level departments like sites… 

And then another subloop inside those for 3rd level departments that might appear in the future? 

If we put 3-4 nested subloops in the code to traverse a single object, it becomes rather ugly.

-------

Let’s try recursion.

As we can see, when our function gets a department to sum, there are two possible cases:

Either it’s a “simple” department with an array of people – then we can sum the salaries in a simple loop.

Or it’s an object with N subdepartments – then we can make N recursive calls to get the sum for 
each of the subdeps and combine the results.

The 1st case is the base of recursion, the trivial case, when we get an array.

The 2nd case when we get an object is the recursive step. A complex task is split into 
subtasks for smaller departments. 

They may in turn split again, but sooner or later the split will finish at (1).

The algorithm is probably even easier to read from the code:
*/

let company = { // the same object, compressed for brevity
  sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 1600 }],
  development: {
    sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
    internals: [{name: 'Jack', salary: 1300}]
  }
};

// The function to do the job
function sumSalaries(department) {
  if (Array.isArray(department)) { // case (1)
    return department.reduce((prev, current) => prev + current.salary, 0); // sum the array
  } else { // case (2)
    let sum = 0;
    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep); // recursively call for subdepartments, sum the results
    }
    return sum;
  }
};

alert(sumSalaries(company)); // 7700