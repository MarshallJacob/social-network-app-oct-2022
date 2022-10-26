const { Schema, model, Types } = require('mongoose');

// Create a schema for the reactions model to go throught the thought model
const reactionsSchema = new Schema(
  {
      reactionsId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId()
      },
      reactionsBody: {
          type: String,
          required: true,
          minLength: 1,
          maxLength: 280
      },
      username: {
          type: String,
          required: true
      },
      createdAt: {
          type: Date,
          default: Date.now,
          get: Date.now,
      },
  },
  {
      toJSON: {
          getters: true
      },
      id: false
  }
);


// Create a schema for the thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: Date.now
    },
    username: [
        {
          type: String,
          required: true
        },
    ],
    reactions: [reactionsSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

thoughtSchema
.virtual('reactionsCount')
.get( function () {
    return this.reactions.length;
});



const Thought = model('thought', thoughtSchema);

module.exports = Thought;
