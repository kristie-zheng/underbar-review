(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };



  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined) {
      return array[array.length - 1];
    } else if (n <= array.length) {
      return array.slice(array.length - n, array.length);
    } else {
      return array;
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    //input: arr or obj and iterator func
    //output: no return val, but runs iter func on coll

  /*pseudo
    if coll = arr
      for loop iterate 
        apply iterator to ele, ind, coll

    if coll = obj
      for in loop iterate
        apply iterator to val, key, coll
  */

    if (collection.constructor === Array) {
      for (let i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else if (collection.constructor === Object) {
      for (const key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    //input: arr, pred test
    //output: arr w/ only elements passing predicate

  /* pseudo
    results array
    return _.each on collection, func body 
      that pushes passing eles into results
        
    return results
  */
    let results = [];
    _.each(collection, (ele) => {
      if (test(ele) === true) {
        results.push(ele);
      }
    });
    return results;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    return _.filter(collection, (ele) => {
      return !test(ele);
    });
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    /*
    input: array and a predicate
    output: an array of all items that fail predicate
    constraints: use the filter function
    */
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    let storage = [];
    let iteratedStorage = [];
    // if (arguments[1] === undefined) {
    //   array.forEach(function(ele, ind) {
    //     if (array[ind] !== array[ind - 1]) {
    //       storage.push(ele);  
    //     }
    //   });
    // } else if (arguments[1]) {
    //   console.log('correct if/else')
    //   let iteratedStorage = [];
    //   array.forEach(function(ele, index) {
    //     iteratedStorage.push(iterator(ele));
    //   });
    //   iteratedStorage.forEach(function(ele, index) {
    //     if (iteratedStorage[index] !== iteratedStorage[index - 1]) {
    //       storage.push(array[index]);  
    //     }
    //   });
    if (arguments[1] !== undefined) {
      
      let iterator = arguments[1];
      array.forEach(function(ele, index) {
        if (_.indexOf(iteratedStorage, iterator(ele)) === -1) {
          iteratedStorage.push(iterator(ele));
          storage.push(ele);
        }
      });  
    } else if (arguments[1] === undefined) {
      array.forEach(function(ele, index) {
        if (_.indexOf(storage, ele) === -1) {
          storage.push(ele);
        }
      });
    }
    return storage;
  /*
  input: array, boolean of isSorted, iterator func
  output: array without duplicates when iterator applied (if applicable)
  
  create a storage array
  iterate over array using for each
    if isSorted is true and iterator is undefined
      iterate over the array using foreach
      if element at i is not equal to element at i-1
        push element into storage array
    if isSorted is true and iterator is defined
      create a iteratedStorage array
      iterate over the array using foreach
        push iterated element into iteratedstorage array
      iterate over iteratedstorage array
        if element at i is not equal to element at i-1
          push array at index i into storage array
    else if isSorted is false iterator is not undefined
      apply iterator to each element and apply indexof to check if its in the storage
      if indexof is equal to -1
        push into storage array
    else (issorted is false and iterator is undefined)
      apply indexof to each element to check if its in storage
      iff indexof is equal to -1
        push into storage array
  return storageArray
  */
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    let results = [];  
    _.each(collection, function(ele, ind, collection) {
      results.push(iterator(ele, ind, collection));
    });
    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    
    if (collection.constructor === Array) {
      collection.forEach(function(element, index) {
        if (accumulator !== undefined) {
          accumulator = iterator(accumulator, element);
        } else {
          accumulator = collection[0];
          if (index !== 0) {
            accumulator = iterator(accumulator, element);  
          }
        }
      });
    } else if (collection.constructor === Object) {
      _.each(collection, function(ele, index) {
        if (accumulator !== undefined) {
          accumulator = iterator(accumulator, ele);
        } else {
          accumulator = collection.values[0];
          if (index !== 0) {
            accumulator = iterator(accumulator, ele);
          }
        }
      });
    }
    return accumulator;
  /*
  input: collection (array), iterator function, storage accumulator (optional)
  output: single value (modified accumulator)

  iterate over collection with array.foreach
    if acc is not undefined
      accumulator += each iterated element
    else
      acc = first element of arr
      if index !== 0
        acc += each iterated element 
  return acc
  */
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    
    return _.reduce(collection, function(accumulator, element) {
      if (!iterator) {
        iterator = _.identity;
      }
      if (Boolean(iterator(element)) === false) {
        accumulator = false;
        return accumulator;
      }
      return accumulator;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    var allPass = true;
    if (!iterator) {
      iterator = _.identity;
    }
    return _.reduce(collection, function(accumulator, element) {
      if (Boolean(iterator(element)) === true) {
        accumulator = true;
        return accumulator;
      }
      return accumulator;
    }, false);

    // return _.every(collection, function(element) {
    //   if (!!iterator(element) === false) {
    //     allPass = false;  
      
    //   }
    //   return allPass;
    // });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    let objArr = [...arguments].slice(1);
    // console.log(JSON.stringify(objArr));
    objArr.forEach(function(ele, ind) {
      for (const key in ele) {
        obj[key] = ele[key];
      } 
    });
    return obj;
  

  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    let objArr = [...arguments].slice(1);
    objArr.forEach(function(ele, ind) {
      for (const key in ele) {
        if (obj[key] === undefined) {
          obj[key] = ele[key];
        }
      } 
    });
    return obj;
    
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    // let hasBeenUsed = false;
    // let args = [...arguments];
    // let alreadyCalledArgs = {};
    // let result;
    // // console.log(typeof arguments);
    // return function() {
    //   console.log(JSON.stringify(arguments));
    //   if (alreadyCalledArgs[JSON.stringify(arguments)] === undefined) {
    //     alreadyCalledArgs[JSON.stringify(arguments)] = func.apply(this, arguments);
    //     result = func.apply(this, arguments);
    //     hasBeenUsed = true;
    //     console.log('the called args obj is ' + JSON.stringify(alreadyCalledArgs));
    //   } else {
    //     //console.log('executes here')
    //     result = alreadyCalledArgs[arguments];
    //   }
    //   // console.log(func.apply(this, arguments))
    //   // if (alreadyCalledArgs[func.apply(null, arguments)]) {

    //   // }
    //   return result;
    // };
    var calledArgs = {};
    return function() {
      var args = JSON.stringify(arguments); 
       if (calledArgs[args] === undefined) {
          calledArgs[args] = func.apply(null, arguments);
        }
        return calledArgs[args];
      }
  };



  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    let args = [...arguments].slice(2);
    setTimeout(function() {
      return func.apply(this, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    let arrCopy = array.slice();
    for (let i = 0; i < arrCopy.length; i++) {
      let random = Math.floor(Math.random() * arrCopy.length);
      let currentEle = arrCopy[i];
      let temp = arrCopy[i];
      arrCopy[i] = arrCopy[random];
      arrCopy[random] = temp; 
    }
    return arrCopy;
  };

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
