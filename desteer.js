var DE = DE || {};
DE.Errors = {};
DE.Errors.ConversionError = function(opts) {
  this.name = opts.name || "Extender Error";
  this.message = opts.message || "Unknown Error.";
  this.property = opts.property + " " || "";
  this.toString = function() {
    return this.name + ": " + this.property + this.message
  }
};
var DE = DE || {};
DE.Util = DE.Util || {};
DE.Util.Unwrap = function(val) {
  return typeof val === "function" ? val() : val
};
DE.Util.RemoveElement = function(array, index) {
  var newArray = [];
  for(var i = 0;i < array.length;i++) {
    newArray.push(array[i])
  }
  newArray.splice(index, 1);
  return newArray
};
var DE = DE || {};
DE.Steer = DE.Steer || {};
DE.Steer.Extenders = DE.Steer.Extenders || {};
DE.Steer.Extenders.GameQuery = function(entity, max_speed) {
  entity.max_speed = max_speed || 10;
  entity.de_pos = function() {
    return DE.Math.Vec2d(entity.xy())
  };
  entity.de_heading = function() {
    return DE.Math.HeadingVec(entity.rotate())
  };
  entity.de_max_speed = function() {
    return entity.max_speed
  };
  return entity
};
var DE = DE || {};
DE.Steer = DE.Steer || {};
DE.Steer.Extenders = DE.Steer.Extenders || {};
DE.Steer.Extender = function() {
  function checkExtend(entity) {
    if(entity.de_pos === undefined) {
      throw new DE.Errors.ConversionError({property:"entity.de_pos", message:"is undefined. You must set the position getter in the converter."});
    }
    if(typeof entity.de_pos !== "function") {
      throw new DE.Errors.ConversionError({property:"entity.de_pos", message:"is not a function. You must set the position getter in the converter."});
    }
    if(entity.de_heading === undefined) {
      throw new DE.Errors.ConversionError({property:"entity.de_heading", message:"is undefined. You must set the heading getter in the converter."});
    }
    if(typeof entity.de_heading !== "function") {
      throw new DE.Errors.ConversionError({property:"entity.de_heading", message:"is not a function. You must set the heading getter in the converter."});
    }
    if(entity.de_max_speed === undefined) {
      throw new DE.Errors.ConversionError({property:"entity.de_max_speed ", message:"is undefined. You must set the max_speed getter in the converter."});
    }
    if(typeof entity.de_max_speed !== "function") {
      throw new DE.Errors.ConversionError({property:"entity.de_max_speed", message:"is not a function. You must set the max_speed getter in the converter."});
    }
  }
  function Extender() {
    this.Extend = function(entity, extender) {
      if(entity === undefined) {
        throw new DE.Errors.ConversionError({property:"entity", message:"is undefined. Pass a non-null entity."});
      }
      if(entity instanceof DE.Math.Vector) {
        return entity
      }
      var extender = extender || entity.prototype && entity.prototype.constructor && entity.prototype.constructor.name;
      if(DE.Steer.Extenders[extender] === undefined) {
        throw new DE.Errors.ConversionError({property:"DE.Steer.Extenders." + extender, message:"is undefined.  Register a converter for this type."});
      }
      if(DE.Steer.Extenders[extender].length < 1) {
        throw new DE.Errors.ConversionError({property:"DE.Steer.Extenders." + extender, message:"must accept at least one arg, which is the entity to be converted."});
      }
      var extendedEntity = DE.Steer.Extenders[extender](entity);
      checkExtend(extendedEntity);
      extendedEntity.Steering = new DE.Steer.EntityBehaviors(entity);
      return extendedEntity
    }
  }
  return new Extender
}();
var DE = DE || {};
DE.Math = DE.Math || {};
DE.Math.PI = Math !== undefined ? Math.PI : 3.141592653;
DE.Math.Clamp = function(number, min, max) {
  var c = Math.min(number, max);
  return Math.max(min, c)
};
DE.Math.Rand = function(min, max) {
  return min !== undefined ? DE.Math.Clamp(Math.random() * max, min, max) : Math.random()
};
DE.Math.RadToDeg = function(radians) {
  return DE.Math.CleanFloat(radians * 180 / DE.Math.PI)
};
DE.Math.DegToRad = function(degrees) {
  return DE.Math.CleanFloat(degrees * DE.Math.PI / 180)
};
DE.Math.CleanFloat = function(num) {
  return parseFloat(num.toFixed(7))
};
var DE = DE || {};
DE.Math = DE.Math || {};
DE.Math.Vector = function() {
  function Vector(x, y) {
    if(typeof DE.Util.Unwrap(x) === "object") {
      this.x = DE.Util.Unwrap(x.x) || 0;
      this.y = DE.Util.Unwrap(x.y) || 0
    }else {
      this.x = DE.Util.Unwrap(x) || 0;
      this.y = DE.Util.Unwrap(y) || 0
    }
  }
  Vector.prototype.Scale = function(scale) {
    scale = DE.Util.Unwrap(scale) || 1;
    this.x *= scale;
    this.y *= scale;
    return this
  };
  Vector.prototype.Add = function(vec) {
    vec = DE.Util.Unwrap(vec);
    this.x += vec.x;
    this.y += vec.y;
    return this
  };
  Vector.prototype.Sub = function(vec) {
    vec = DE.Util.Unwrap(vec);
    this.x -= vec.x;
    this.y -= vec.y;
    return this
  };
  Vector.prototype.Dot = function(vec) {
    vec = DE.Util.Unwrap(vec);
    return this.x * vec.x + this.y * vec.y
  };
  Vector.prototype.Length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  };
  Vector.prototype.LengthSQ = function() {
    return this.x * this.x + this.y * this.y
  };
  Vector.prototype.DistanceFrom = function(vec) {
    vec = DE.Util.Unwrap(vec);
    return(new Vector(this.x - vec.x, this.y - vec.y)).Length()
  };
  Vector.prototype.Normalize = function(scalar) {
    var length = this.Length();
    var normalLength = length != 0 ? 1 / length : 1;
    this.x = this.x * normalLength;
    this.y = this.y * normalLength;
    if(scalar > 0) {
      this.Scale(scalar)
    }
    return this
  };
  Vector.prototype.Perp = function() {
    return DE.Math.Vec2d(-this.y, this.x)
  };
  return Vector
}();
DE.Math.Vec2d = function(x, y) {
  return new DE.Math.Vector(x, y)
};
DE.Math.HeadingVec = function(degrees) {
  var rads = DE.Math.DegToRad(degrees);
  var x = DE.Math.CleanFloat(Math.cos(rads));
  var y = DE.Math.CleanFloat(Math.sin(rads));
  return DE.Math.Vec2d(x, y)
};
DE.Math.Vector.Add = function(vec1, vec2) {
  vec1 = DE.Util.Unwrap(vec1);
  vec2 = DE.Util.Unwrap(vec2);
  return DE.Math.Vec2d(vec1.x + vec2.x, vec1.y + vec2.y)
};
DE.Math.Vector.Sub = function(vec1, vec2) {
  vec1 = DE.Util.Unwrap(vec1);
  vec2 = DE.Util.Unwrap(vec2);
  return DE.Math.Vec2d(vec1.x - vec2.x, vec1.y - vec2.y)
};
DE.Math.Vector.Normalize = function(vec, scalar) {
  var normalVec = DE.Math.Vec2d(vec.x, vec.y);
  var length = normalVec.Length();
  var normalLength = length != 0 ? 1 / length : 1;
  normalVec.x = normalVec.x * normalLength;
  normalVec.y = normalVec.y * normalLength;
  if(scalar > 0) {
    normalVec.Scale(scalar)
  }
  return normalVec
};
DE.Math.Vector.HeadingToDeg = function(HeadingVec) {
  var world = DE.Math.Vec2d(1, 0);
  var heading = DE.Math.Vector.Normalize(HeadingVec);
  var degrees = DE.Math.RadToDeg(Math.acos(world.Dot(heading)));
  if(heading.y < 0) {
    degrees = 360 - degrees
  }
  return degrees
};
DE.Math.Vector.WorldToLocal = function(vec, headingVec) {
  var perp = headingVec.Perp();
  var mat = [[headingVec.x, perp.x], [headingVec.y, perp.y]];
  var x = vec.x * mat[0][0] + vec.y * mat[0][1];
  var y = vec.x * mat[1][0] + vec.y * mat[1][1];
  return DE.Math.Vec2d(x, y)
};
DE.Math.Vector.LocalToWorld = function(vec, headingVec, pos) {
  var world = DE.Math.Vec2d(1, 0);
  var degrees = DE.Math.Vector.HeadingToDeg(headingVec);
  var inverse = DE.Math.Vector.WorldToLocal(DE.Math.HeadingVec(-degrees), world);
  var perp = inverse.Perp();
  var mat = [[inverse.x, perp.x], [inverse.y, perp.y]];
  var x = DE.Math.CleanFloat(vec.x * mat[0][0] + vec.y * mat[0][1]);
  var y = DE.Math.CleanFloat(vec.x * mat[1][0] + vec.y * mat[1][1]);
  return DE.Math.Vec2d(x, y).Add(pos)
};
DE.Math.Vector.MidPoint = function(vec1, vec2) {
  var x = (vec1.x + vec2.x) * 0.5;
  var y = (vec1.y + vec2.y) * 0.5;
  return DE.Vec2d(x, y)
};
DE.Math.Vector.HeadingToDegTest = function() {
  for(var i = 0;i < 360;i++) {
    var x = DE.Math.CleanFloat(Math.cos(DE.Math.DegToRad(i)));
    var y = DE.Math.CleanFloat(Math.sin(DE.Math.DegToRad(i)));
    var heading = DE.Math.Vec2d(x, y);
    var deg = DE.Math.Vector.HeadingToDeg(heading);
    if(deg < i - 1E-4 || deg > i + 1E-4) {
      console.log("heading:", heading, "got:", deg, " Expected:", i)
    }
  }
};
DE.Math.Vector.VecTest = function() {
  var test = DE.Vec2d(1, 0);
  for(var i = 0;i <= 360;i += 5) {
    var local = DE.Math.Vector.WorldToLocal(test, DE.Math.HeadingVec(i));
    var world = DE.Math.Vector.LocalToWorld(local, DE.Math.HeadingVec(i), DE.Math.Vec2d(0, 0));
    if(world.x < test.x - 1E-4 || world.x > test.x + 1E-4) {
      console.log("AT: ", i, " Expected x to be:", test.x, "  Got:", world.x)
    }
    if(world.y < test.y - 1E-4 || world.y > test.y + 1E-4) {
      console.log("AT: ", i, " Expected x to be:", test.y, "  Got:", world.y)
    }
  }
};
var de = de || {};
de.steer = de.steer || {};
de.steer.Behaviors = function() {
  function Behaviors() {
  }
  return Behaviors
}();
de.steer.Behaviors.prototype.Align = function(headingVec, neighborHeadings) {
  var averageHeading = DE.Math.Vec2d();
  var neighborCount = neighborHeadings.length;
  for(var i = 0;i < neighborCount;++i) {
    averageHeading.Add(neighborHeadings[i])
  }
  if(neighborCount > 0) {
    averageHeading.Scale(1 / neighborCount);
    averageHeading.Sub(headingVec)
  }
  return averageHeading
};
de.steer.Behaviors.prototype.Arrive = function(pos, target, max_speed, decelForce) {
  decelForce = decelForce || 5;
  var distToTarget = pos.DistanceFrom(target);
  if(distToTarget > 0) {
    var arriveSpeed = distToTarget / decelForce;
    arriveSpeed = DE.Math.Clamp(arriveSpeed, 0, max_speed);
    return this.Seek(pos, target, arriveSpeed)
  }
  return DE.Math.Vec2d(0, 0)
};
de.steer.Behaviors.prototype.Cohese = function(pos, neighborPositions, max_speed) {
  var centerOfMass = DE.Math.Vec2d(0, 0);
  var neighborCount = neighborPositions.length;
  for(var i = 0;i < neighborCount;i++) {
    centerOfMass.Add(neighborPositions[i])
  }
  if(neighborCount > 0) {
    centerOfMass.Scale(1 / neighborCount);
    return this.Arrive(pos, centerOfMass, max_speed)
  }
  return DE.Math.Vec2d(0, 0)
};
de.steer.Behaviors.prototype.Evade = function(pos, target, max_speed, targetHeadingDeg, targetCurrentSpeed) {
  var toTarget = DE.Math.Vector.Sub(target, pos);
  var heading = DE.Math.HeadingVec(targetHeadingDeg);
  var targetCurrentSpeed = targetCurrentSpeed || 60;
  var lookAhead = toTarget.Length() / (max_speed + targetCurrentSpeed);
  var estimatedTargetPos = DE.Math.Vector.Add(target, heading.Normalize(lookAhead));
  return this.Flee(pos, estimatedTargetPos)
};
de.steer.Behaviors.prototype.Flee = function(pos, target, max_speed, fleeRadius) {
  var shouldFlee = fleeRadius === undefined || fleeRadius === -1 || target.DistanceFrom(pos) <= fleeRadius;
  var flee = DE.Math.Vector.Sub(pos, target).Normalize(max_speed);
  return shouldFlee ? flee : DE.Math.Vec2d(0, 0)
};
de.steer.Behaviors.prototype.Hide = function(first_argument) {
};
de.steer.Behaviors.prototype.Interpose = function(pos, target_1, target_2, max_speed) {
  var midpoint = DE.Math.Vector.MidPoint(target_1, target_2);
  return Arrive(pos, midpoint, max_speed)
};
de.steer.Behaviors.prototype.ObstacleAvoid = function(first_argument) {
};
de.steer.Behaviors.prototype.Pursuit = function(pos, target, max_speed, targetHeading, targetCurrentSpeed) {
  var toTarget = DE.Math.Vector.Sub(target, pos), heading = targetHeading instanceof DE.Math.Vector ? targetHeading : DE.Math.HeadingVec(targetHeadingDeg), targetCurrentSpeed = targetCurrentSpeed || 60;
  var lookAhead = toTarget.Length() / (max_speed + targetCurrentSpeed);
  var estimatedTargetPos = DE.Math.Vector.Add(target, heading.Normalize(lookAhead));
  return this.Seek(pos, estimatedTargetPos)
};
de.steer.Behaviors.prototype.Seek = function(pos, target, max_speed) {
  return DE.Math.Vector.Sub(target, pos).Normalize(max_speed)
};
de.steer.Behaviors.prototype.Seperation = function(pos, neighborPositions) {
  var seperationForce = DE.Math.Vec2d(0, 0), neighborCount = neighborPositions.length;
  for(var i = 0;i < neighborCount;i++) {
    var awayFromNeighbor = DE.Math.Vector.Sub(pos, neighborPositions[i]);
    var distanceToNeighbor = awayFromNeighbor.Length();
    seperationForce.Add(awayFromNeighbor.Normalize(128 / distanceToNeighbor))
  }
  return seperationForce
};
de.steer.Behaviors.prototype.Wander = function(pos, target, HeadingVec) {
  var radius = 1, dist = 10, jitter = 1;
  var wanderx = DE.Math.Rand(-1, 1);
  var wandery = DE.Math.Rand(-1, 1);
  var wanderVec = DE.Math.Vec2d(wanderx, wandery).Normalize();
  target.Add(wanderVec).Normalize(radius);
  var localTarget = DE.Math.Vector.Add(target, DE.Math.Vec2d(dist, 0));
  var targetWorld = DE.Math.Vector.LocalToWorld(localTarget, HeadingVec, pos);
  return this.Seek(pos, targetWorld, 1)
};
var de = de || {};
de.steer = de.steer || {};
de.steer.EntityBehaviors = function() {
  function EntityBehaviors(entity) {
    this.entity = entity;
    this.de_wander_target = de.Math.Vec2d()
  }
  return EntityBehaviors
}();
de.steer.EntityBehaviors.prototype.ToLocal = function(vec) {
  return de.Math.Vector.WorldToLocal(vec, this.entity.de_heading())
};
de.steer.EntityBehaviors.prototype.Align = function(first_argument) {
};
de.steer.EntityBehaviors.prototype.Arrive = function(targetEntity, decelForce) {
  var pos = this.entity.de_pos(), target_pos = targetEntity.de_pos(), max_speed = this.entity.de_max_speed();
  return de.steer.Behaviors.Arrive(pos, target_pos, max_speed, decelForce)
};
de.steer.EntityBehaviors.prototype.Cohese = function(neighbors) {
  var pos = this.entity.de_pos(), max_speed = this.entity.de_max_speed(), neighborPositions = [];
  for(var i = 0, l = neighbors.length;i < l;i++) {
    neighborPositions.push(neighbors.de_pos())
  }
  return de.steer.Behaviors.Cohese(pos, neighborPositions, max_speed)
};
de.steer.EntityBehaviors.prototype.Evade = function(targetEntity) {
  var pos = this.entity.de_pos(), max_speed = this.entity.de_max_speed(), target_pos = target.de_pos(), target_heading = target.de_heading(), target_vel = target.de_max_speed();
  return de.steer.Behaviors.Evade(pos, target_pos, max_speed, target_heading, target_vel)
};
de.steer.EntityBehaviors.prototype.Flee = function(targetEntity, fleeRadius) {
  var pos = this.entity.de_pos(), target_pos = target.de_pos(), max_speed = this.entity.de_max_speed();
  return de.steer.Behaviors.Flee(pos, target, max_speed, fleeRadius)
};
de.steer.EntityBehaviors.prototype.Hide = function(first_argument) {
};
de.steer.EntityBehaviors.prototype.Interpose = function(first_argument) {
};
de.steer.EntityBehaviors.prototype.ObstacleAvoid = function(first_argument) {
};
de.steer.EntityBehaviors.prototype.Pursuit = function(targetEntity) {
  var pos = this.entity.de_pos(), max_speed = this.entity.de_max_speed(), target_pos = target.de_pos(), target_heading = target.de_heading(), target_vel = target.de_max_speed();
  return de.steer.Behaviors.Pursuit(pos, target_pos, max_speed, target_heading, target_vel)
};
de.steer.EntityBehaviors.prototype.Seek = function(targetEntity) {
  var pos = this.entity.de_pos(), max_speed = this.entity.de_max_speed(), target = targetEntity.de_pos();
  return de.steer.Behaviors.Seek(pos, target, max_speed)
};
de.steer.EntityBehaviors.prototype.Seperation = function(neighbors) {
  var pos = this.entity.de_pos(), neighborPositions = [];
  for(var i = 0, l = neighbors.length;i < l;i++) {
    neighborPositions.push(neighbors.de_pos())
  }
  return de.steer.Behaviors.Seperation(pos, neighborPositions)
};
de.steer.EntityBehaviors.prototype.Wander = function() {
  var pos = this.entity.de_pos(), target = this.de_wander_target, heading = this.entity.de_heading();
  return de.steer.Behaviors.Wander(pos, target, heading)
};

