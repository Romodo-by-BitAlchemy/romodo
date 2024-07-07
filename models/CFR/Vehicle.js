const Joi = require('joi');

const VehicleSchema = Joi.object({
  name: Joi.string().required(),
  label: Joi.string(),
  loadLimits: Joi.object({
    weightLimit: Joi.object({
      amount: Joi.number(),
      unit: Joi.string().valid('KILOGRAMS', 'POUNDS')
    }),
    volumeLimit: Joi.object({
      amount: Joi.number(),
      unit: Joi.string().valid('CUBIC_METERS', 'CUBIC_FEET')
    })
  }),
  startLocation: Joi.object({
    latLng: Joi.object({
      latitude: Joi.number().min(-90).max(90).required(),
      longitude: Joi.number().min(-180).max(180).required()
    }),
    heading: Joi.number().min(0).max(360)
  }).required(),
  endLocation: Joi.object({
    latLng: Joi.object({
      latitude: Joi.number().min(-90).max(90).required(),
      longitude: Joi.number().min(-180).max(180).required()
    }),
    heading: Joi.number().min(0).max(360)
  }),
  routeDistanceLimit: Joi.object({
    maxMeters: Joi.number().positive(),
    softMaxMeters: Joi.number().positive()
  }),
  routeDurationLimit: Joi.object({
    maxSeconds: Joi.number().positive(),
    softMaxSeconds: Joi.number().positive()
  }),
  travelMode: Joi.string().valid('DRIVING', 'CYCLING', 'WALKING'),
  unloadingPolicy: Joi.object({
    fixedWaitingTime: Joi.string().pattern(/^(\d+(\.\d+)?h)?(\d+(\.\d+)?m)?(\d+(\.\d+)?s)?$/),
    perLoadUnitTime: Joi.object({
      amount: Joi.number().positive(),
      unit: Joi.string().valid('SECONDS', 'MINUTES', 'HOURS')
    })
  }),
  loadingPolicy: Joi.object({
    fixedWaitingTime: Joi.string().pattern(/^(\d+(\.\d+)?h)?(\d+(\.\d+)?m)?(\d+(\.\d+)?s)?$/),
    perLoadUnitTime: Joi.object({
      amount: Joi.number().positive(),
      unit: Joi.string().valid('SECONDS', 'MINUTES', 'HOURS')
    })
  }),
  breakRule: Joi.object({
    breakPeriods: Joi.array().items(Joi.object({
      startTime: Joi.string().pattern(/^(\d{2}):(\d{2})$/),
      endTime: Joi.string().pattern(/^(\d{2}):(\d{2})$/)
    })),
    frequency: Joi.object({
      maximumWorkDuration: Joi.string().pattern(/^(\d+(\.\d+)?h)?(\d+(\.\d+)?m)?(\d+(\.\d+)?s)?$/),
      minimumBreakDuration: Joi.string().pattern(/^(\d+(\.\d+)?h)?(\d+(\.\d+)?m)?(\d+(\.\d+)?s)?$/)
    })
  }),
  extraVisitDurationForVisitType: Joi.object().pattern(
    Joi.string(),
    Joi.string().pattern(/^(\d+(\.\d+)?h)?(\d+(\.\d+)?m)?(\d+(\.\d+)?s)?$/)
  ),
  costPerHour: Joi.number().positive(),
  costPerKilometer: Joi.number().positive(),
  fixedCost: Joi.number().positive(),
  usedIfRouteIsEmpty: Joi.boolean()
});

module.exports = VehicleSchema;
