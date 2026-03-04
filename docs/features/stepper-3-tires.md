### 3 tires

✨ add as the step 3 from the stepper I want to add a tire set.
I can have a set of 4 tires on the car and 4 in storage. I want to be able to move a tire set from storage to car and from car to storage.
The storage point is defined by the section, row, shelf and floor as R1E1E2. For now this can be a string.
The number of caps is a numeric input.
- storage point: R1E1E2 (required)
- caps number: 16 (required)

To add tires, create a TireForm component with the required fields:
- width: 215
- height: 65
- diameter type: R15
- brand (autocomplete dropdown)
- rim type (radio): plate / alloy
- tire type (radio): regular / runflat
- wear indicator (radio): Good, OK, Warning, Danger
- season (radio): summer, winter, all-season

in the 3rd step of the @VisitStepper.tsx I want to see the 8 tires in two containers (on car, in storage). After I generate the batch, I want to be able to edit, clone, delete each tire.

- storage point: R1E1E2
- caps number: 16

- ✅ create/edit tire
  - width: 215
  - height: 65
  - diameter type: R15
  - brand (autocomplete dropdown)
  - rim type (radio): plate / alloy
  - tire type (radio): regular / runflat
  - wear indicator (radio): Good, OK, Warning, Danger
  - season (radio): summer, winter, all-season

- ✅ edit tire
- ✅ clone tire
- ✅ delete tire

- ✅ switch: on car vs in storage
