var DE = DE || {};
DE.Steer = DE.Steer || {};
DE.Steer.Behaviors = {};
DE.Steer.Behaviors.Align = function(headingVec, neighborHeadings) {
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
DE.Steer.Behaviors.Arrive = function(pos, target, max_speed, DEcelForce) {
  DEcelForce = DEcelForce || 5;
  var distToTarget = pos.DistanceFrom(target);
  if(distToTarget > 0) {
    var arriveSpeed = distToTarget / DEcelForce;
    arriveSpeed = DE.Math.Clamp(arriveSpeed, 0, max_speed);
    return this.Seek(pos, target, arriveSpeed)
  }
  return DE.Math.Vec2d(0, 0)
};
DE.Steer.Behaviors.Cohese = function(pos, neighborPositions, max_speed) {
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
DE.Steer.Behaviors.Evade = function(pos, target, max_speed, targetHeadingDEg, targetCurrentSpeed) {
  var toTarget = DE.Math.Vector.Sub(target, pos);
  var heading = DE.Math.HeadingVec(targetHeadingDeg);
  var targetCurrentSpeed = targetCurrentSpeed || 60;
  var lookAhead = toTarget.Length() / (max_speed + targetCurrentSpeed);
  var estimatedTargetPos = DE.Math.Vector.Add(target, heading.Normalize(lookAhead));
  return this.Flee(pos, estimatedTargetPos)
};
DE.Steer.Behaviors.Flee = function(pos, target, max_speed, fleeRadius) {
  var shouldFlee = fleeRadius === undefined || fleeRadius === -1 || target.DistanceFrom(pos) <= fleeRadius;
  var flee = DE.Math.Vector.Sub(pos, target).Normalize(max_speed);
  return shouldFlee ? flee : DE.Math.Vec2d(0, 0)
};
DE.Steer.Behaviors.Hide = function(first_argument) {
};
DE.Steer.Behaviors.Interpose = function(pos, target_1, target_2, max_speed) {
  var midpoint = DE.Math.Vector.MidPoint(target_1, target_2);
  return Arrive(pos, midpoint, max_speed)
};
DE.Steer.Behaviors.ObstacleAvoid = function(first_argument) {
};
DE.Steer.Behaviors.Pursuit = function(pos, target, max_speed, targetHeading, targetCurrentSpeed) {
  var toTarget = DE.Math.Vector.Sub(target, pos), heading = targetHeading instanceof DE.Math.Vector ? targetHeading : DE.Math.HeadingVec(targetHeadingDEg), targetCurrentSpeed = targetCurrentSpeed || 60;
  var lookAhead = toTarget.Length() / (max_speed + targetCurrentSpeed);
  var estimatedTargetPos = DE.Math.Vector.Add(target, heading.Normalize(lookAhead));
  return this.Seek(pos, estimatedTargetPos)
};
DE.Steer.Behaviors.Seek = function(pos, target, max_speed) {
  return DE.Math.Vector.Sub(target, pos).Normalize(max_speed)
};
DE.Steer.Behaviors.Seperation = function(pos, neighborPositions) {
  var seperationForce = DE.Math.Vec2d(0, 0), neighborCount = neighborPositions.length;
  for(var i = 0;i < neighborCount;i++) {
    var awayFromNeighbor = DE.Math.Vector.Sub(pos, neighborPositions[i]);
    var distanceToNeighbor = awayFromNeighbor.Length();
    seperationForce.Add(awayFromNeighbor.Normalize(128 / distanceToNeighbor))
  }
  return seperationForce
};
DE.Steer.Behaviors.Wander = function(pos, target, headingVec) {
  var radius = 1, dist = 10, jitter = 1;
  var wanderx = DE.Math.Rand(-1, 1);
  var wandery = DE.Math.Rand(-1, 1);
  var wanderVec = DE.Math.Vec2d(wanderx, wandery).Normalize();
  target.Add(wanderVec).Normalize(radius);
  var localTarget = DE.Math.Vector.Add(target, DE.Math.Vec2d(dist, 0));
  var targetWorld = DE.Math.Vector.LocalToWorld(localTarget, headingVec, pos);
  return this.Seek(pos, targetWorld, 1)
};
var DE = DE || {};
DE.Steer = DE.Steer || {};
DE.Steer.EntityBehaviors = function() {
  function EntityBehaviors(entity) {
    this.entity = entity;
    this.DE_wander_target = DE.Math.Vec2d()
  }
  return EntityBehaviors
}();
DE.Steer.EntityBehaviors.prototype.ToLocal = function(vec) {
  return DE.Math.Vector.WorldToLocal(vec, this.entity.DE_heading())
};
DE.Steer.EntityBehaviors.prototype.Align = function(first_argument) {
};
DE.Steer.EntityBehaviors.prototype.Arrive = function(targetEntity, DEcelForce) {
  var pos = this.entity.DE_pos(), target_pos = targetEntity.DE_pos(), max_speed = this.entity.DE_max_speed();
  return DE.Steer.Behaviors.Arrive(pos, target_pos, max_speed, DEcelForce)
};
DE.Steer.EntityBehaviors.prototype.Cohese = function(neighbors) {
  var pos = this.entity.DE_pos(), max_speed = this.entity.DE_max_speed(), neighborPositions = [];
  for(var i = 0, l = neighbors.length;i < l;i++) {
    neighborPositions.push(neighbors.DE_pos())
  }
  return DE.Steer.Behaviors.Cohese(pos, neighborPositions, max_speed)
};
DE.Steer.EntityBehaviors.prototype.Evade = function(targetEntity) {
  var pos = this.entity.DE_pos(), max_speed = this.entity.DE_max_speed(), target_pos = target.DE_pos(), target_heading = target.DE_heading(), target_vel = target.DE_max_speed();
  return DE.Steer.Behaviors.Evade(pos, target_pos, max_speed, target_heading, target_vel)
};
DE.Steer.EntityBehaviors.prototype.Flee = function(targetEntity, fleeRadius) {
  var pos = this.entity.DE_pos(), target_pos = target.DE_pos(), max_speed = this.entity.DE_max_speed();
  return DE.Steer.Behaviors.Flee(pos, target, max_speed, fleeRadius)
};
DE.Steer.EntityBehaviors.prototype.HiDE = function(first_argument) {
};
DE.Steer.EntityBehaviors.prototype.Interpose = function(first_argument) {
};
DE.Steer.EntityBehaviors.prototype.ObstacleAvoid = function(first_argument) {
};
DE.Steer.EntityBehaviors.prototype.Pursuit = function(targetEntity) {
  var pos = this.entity.DE_pos(), max_speed = this.entity.DE_max_speed(), target_pos = target.DE_pos(), target_heading = target.DE_heading(), target_vel = target.DE_max_speed();
  return DE.Steer.Behaviors.Pursuit(pos, target_pos, max_speed, target_heading, target_vel)
};
DE.Steer.EntityBehaviors.prototype.Seek = function(targetEntity) {
  var pos = this.entity.DE_pos(), max_speed = this.entity.DE_max_speed(), target = targetEntity.DE_pos();
  return DE.Steer.Behaviors.Seek(pos, target, max_speed)
};
DE.Steer.EntityBehaviors.prototype.Seperation = function(neighbors) {
  var pos = this.entity.DE_pos(), neighborPositions = [];
  for(var i = 0, l = neighbors.length;i < l;i++) {
    neighborPositions.push(neighbors.DE_pos())
  }
  return DE.Steer.Behaviors.Seperation(pos, neighborPositions)
};
DE.Steer.EntityBehaviors.prototype.Wander = function() {
  var pos = this.entity.DE_pos(), target = this.DE_wander_target, heading = this.entity.DE_heading();
  return DE.Steer.Behaviors.Wander(pos, target, heading)
};
var DE = DE || {};
DE.Steer = DE.Steer || {};
DE.Steer.Extenders = DE.Steer.Extenders || {};
DE.Steer.Extender = function() {
  function checkExtend(entity) {
    if(entity.DE_pos === undefined) {
      throw new DE.Errors.ConversionError({property:"entity.DE_pos", message:"is undefined. You must set the position getter in the converter."});
    }
    if(typeof entity.DE_pos !== "function") {
      throw new DE.Errors.ConversionError({property:"entity.DE_pos", message:"is not a function. You must set the position getter in the converter."});
    }
    if(entity.DE_heading === undefined) {
      throw new DE.Errors.ConversionError({property:"entity.DE_heading", message:"is undefined. You must set the heading getter in the converter."});
    }
    if(typeof entity.DE_heading !== "function") {
      throw new DE.Errors.ConversionError({property:"entity.DE_heading", message:"is not a function. You must set the heading getter in the converter."});
    }
    if(entity.DE_max_speed === undefined) {
      throw new DE.Errors.ConversionError({property:"entity.DE_max_speed ", message:"is undefined. You must set the max_speed getter in the converter."});
    }
    if(typeof entity.DE_max_speed !== "function") {
      throw new DE.Errors.ConversionError({property:"entity.DE_max_speed", message:"is not a function. You must set the max_speed getter in the converter."});
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
DE.Steer = DE.Steer || {};
DE.Steer.Extenders = DE.Steer.Extenders || {};
DE.Steer.Extenders.GameQuery = function(entity, max_speed) {
  entity.max_speed = max_speed || 10;
  entity.DE_pos = function() {
    return DE.Math.Vec2d(entity.xy())
  };
  entity.DE_heading = function() {
    return DE.Math.HeadingVec(entity.rotate())
  };
  entity.DE_max_speed = function() {
    return entity.max_speed
  };
  return entity
};
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
DE.Math.RandBool = function() {
  return DE.Math.Rand(0, 1) > 0.5
};
DE.Math.RadToDeg = function(radians) {
  return DE.Math.CleanFloat(radians * 180 / DE.Math.PI)
};
DE.Math.DegToRad = function(DEgrees) {
  return DE.Math.CleanFloat(DEgrees * DE.Math.PI / 180)
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
  return Vector
}();
DE.Math.Vector.prototype.Scale = function(scale) {
  scale = DE.Util.Unwrap(scale) || 1;
  this.x *= scale;
  this.y *= scale;
  return this
};
DE.Math.Vector.prototype.Add = function(vec) {
  vec = DE.Util.Unwrap(vec);
  this.x += vec.x;
  this.y += vec.y;
  return this
};
DE.Math.Vector.prototype.Sub = function(vec) {
  vec = DE.Util.Unwrap(vec);
  this.x -= vec.x;
  this.y -= vec.y;
  return this
};
DE.Math.Vector.prototype.Dot = function(vec) {
  vec = DE.Util.Unwrap(vec);
  return this.x * vec.x + this.y * vec.y
};
DE.Math.Vector.prototype.Length = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y)
};
DE.Math.Vector.prototype.LengthSQ = function() {
  return this.x * this.x + this.y * this.y
};
DE.Math.Vector.prototype.DistanceFrom = function(vec) {
  vec = DE.Util.Unwrap(vec);
  return(new DE.Math.Vector(this.x - vec.x, this.y - vec.y)).Length()
};
DE.Math.Vector.prototype.Normalize = function(scalar) {
  var length = this.Length();
  var normalLength = length != 0 ? 1 / length : 1;
  this.x = this.x * normalLength;
  this.y = this.y * normalLength;
  if(scalar > 0) {
    this.Scale(scalar)
  }
  return this
};
DE.Math.Vector.prototype.Perp = function() {
  return DE.Math.Vec2d(-this.y, this.x)
};
DE.Math.Vec2d = function(x, y) {
  return new DE.Math.Vector(x, y)
};
DE.Math.HeadingVec = function(degrees) {
  var rads = DE.Math.DegToRad(degrees);
  var x = DE.Math.CleanFloat(Math.cos(rads));
  var y = DE.Math.CleanFloat(Math.sin(rads));
  return DE.Math.Vec2d(x, y).Normalize()
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
DE.Math.Vector.HeadingToDeg = function(heading) {
  var world = DE.Math.Vec2d(1, 0);
  var normalized_heading = DE.Math.Vector.Normalize(heading);
  var degrees = DE.Math.RadToDeg(Math.acos(world.Dot(normalized_heading)));
  if(heading.y < 0) {
    degrees = 360 - degrees
  }
  return degrees
};
DE.Math.Vector.WorldToLocal = function(vec, heading) {
  var perp = heading.Perp();
  var mat = [[heading.x, perp.x], [heading.y, perp.y]];
  var x = vec.x * mat[0][0] + vec.y * mat[0][1];
  var y = vec.x * mat[1][0] + vec.y * mat[1][1];
  return DE.Math.Vec2d(x, y)
};
DE.Math.Vector.LocalToWorld = function(vec, heading, pos) {
  var world = DE.Math.Vec2d(1, 0);
  var degrees = DE.Math.Vector.HeadingToDeg(heading);
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
    var x = DE.Math.CleanFloat(Math.cos(DE.Math.DEgToRad(i)));
    var y = DE.Math.CleanFloat(Math.sin(DE.Math.DEgToRad(i)));
    var heading = DE.Math.Vec2d(x, y);
    var DEg = DE.Math.DE.Math.Vector.HeadingToDeg(heading);
    if(DEg < i - 1E-4 || DEg > i + 1E-4) {
      console.log("heading:", heading, "got:", DEg, " Expected:", i)
    }
  }
};
DE.Math.Vector.VecTest = function() {
  var test = DE.Vec2d(1, 0);
  for(var i = 0;i <= 360;i += 5) {
    var local = DE.Math.DE.Math.Vector.WorldToLocal(test, DE.Math.HeadingVec(i));
    var world = DE.Math.DE.Math.Vector.LocalToWorld(local, DE.Math.HeadingVec(i), DE.Math.Vec2d(0, 0));
    if(world.x < test.x - 1E-4 || world.x > test.x + 1E-4) {
      console.log("AT: ", i, " Expected x to be:", test.x, "  Got:", world.x)
    }
    if(world.y < test.y - 1E-4 || world.y > test.y + 1E-4) {
      console.log("AT: ", i, " Expected x to be:", test.y, "  Got:", world.y)
    }
  }
};
var DE = DE || {};
DE.Errors = {};
DE.Errors.ConversionError = function(opts) {
  this.name = opts.name || "ExtenDEr Error";
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
DE.Util.RemoveElement = function(array, inDEx) {
  var newArray = [];
  for(var i = 0;i < array.length;i++) {
    newArray.push(array[i])
  }
  newArray.splice(inDEx, 1);
  return newArray
};

