# Schema Validator
##### This validation library allows user to validate wheather an object meets the declarative defined schema defintion. If the object satisfies the schema definition, an object is returned that confined to the schema.

## Installation and Usage
Install the library with `npm install --save @jackym/schema-validator` or `yarn add @jackym/schema-validator`

```javascript
import schemaValidator from '@jackym/schema-validator';
const obj = {};
const defintion = {
    name: { type: 'string' },
    id: { type: 'int' }
};

const result = schemaValidator.validate(obj, defintion);

if(result.isValid) {
    //do something
} else {
    // show the error message from result.error.data
}
```

## Supported Built-in Validation Types
* int - integer number, even if the value is in string format

* float - float number, even if the value is in string format

* bool - boolean, if the value is string 'true' or 'false'

* string - string value

* array - array type

* enum - custom defined values

* match - allow users to define their own RegExp or function to verify the data

* object - object graph, which allows user to define nested objects

## Schema Definition Documentation
#### Format
```javascript

const definition = {
    'property-name': { definition }
}

`property-name` is the name of the property that you expect the object to have
```


#### Definition
```javascript
{
    // one of the built-in types
    type: 'built-in types'

    // (Optional) Default to true, which means all fields are required by default unless overwrite by users
    require: true

    /*
    * (Optional)
    * if the field is required, and the value is null or underfined, then you can provide a default value
    * to suppress the validation error message
    */
    default: 'any value'

    /*
    * (Optional)
    * This is required when the type value is = 'enum'
    * The 'list of pre-defined' values can be list of string or number
    */
    enum: [ list of pre-defined values ]

    /*
    * (Optional)
    * This is required when the type value is = 'match'
    * Match can be a regular expression or a function `myfunc(value)` that returns true of false
    */
    match: RegExp or function

    /*
    * (Optional)
    * This is required when the type value is = 'object'
    * Can use this to define nested objects in the object graph
    */
    schema: {}
}

```

## Schema Definition Examples

##### Declare a definition for simple `int` type
```javascript
const definition = {
    studentId: {
        type: 'int'
    }
}
```

##### Declare a definition for an optional `int` type
```javascript
const definition = {
    studentId: {
        type: 'int',
        require: false,
        default: 0
    }
}
```

##### Declare a definition for an `enum` type
```javascript
const definition = {
    size: {
        type: 'enum',
        enum: ['small', 'medium', 'large']
    }
}

const definition = {
    orderType: {
        type: 'enum',
        enum: [1, 2, 3, 8]
    }
}
```

##### Declare a definition for a `match` type
```javascript
const definition = {
    year: {
        type: 'match',
        match: /\d{4}/
    }
}

const definition = {
    year: {
        type: 'match',
        match: function(val) {
            const y = parseInt(val);
            return y > 2000;
        }
    }
}
```

##### Declare a definition for an `object` type
```javascript
const definition = {
    order: {
        name: {
            type: 'string'
        },
        total: {
            type: 'float'
        }
        item: {
            type: 'object',
            schema: {
                description: {
                    type: 'string'
                },
                quantity: {
                    type: 'int'
                }
            }
        }
    }
}

```

## API Documentation
```javascript
/**
*   @param obj  object - any object
*   @param obj  schemaDefinition - a valid schema definition
*
*   @return obj
    {
       isValid: true or false,
       value: object, //only if isValid = true
       error: {
           type: 'definition-error' or 'schema-error',
           data: [
             {
                 key: 'string',
                 message: 'string'
             },
             ...
            ]
        }
    }
*/
validate(object, schemaDefinition);

```

**definition-error:** - these are the errors showing that the schema definition object that you defined is not valid.

**schema-error:** - these are the errors showing the object that does not match your schema definition.


