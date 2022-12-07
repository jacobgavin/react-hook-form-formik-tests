# Formik vs React hook form

## Background
We have been using formik in our new web-portal. When we started working with our new web-portal
React was in version 16 so hooks were pretty new and there wasn't really a solid
and well known form library out there for hooks. The choices we had were either `formik`
or `redux-form` but we didn't want to use redux so we were left with `formik`.

As our web-portal grew and the forms got bigger and more complex we noticed some
performance issues with formik v2. It appeared to be a performance issue when using
formiks hooks like `useField` and `useFormikContext` which subscribed to all field updates.
This will result in many unnecessary renders. If you have a form with just a few fields you
will probably not notice this but as soon as you have more than 10-15 fields there is a significant
lag when typing in an input.

## Technicals

| Size            | Minified | Minified + gzipped |
| --------------- | -------- | ------------------ |
| Formik          | 44.4 kb  | 13 kb              |
| react-hook-form | 25.1 kb  | 9 kb               |

| Renders         | With provider                    | No Provider                                   |
| --------------- | -------------------------------- | --------------------------------------------- |
| Formik          | 4 re-renders/input on each input | Formik does not support form without provider |
| react-hook-form | 0 re-renders/input on each input | 0 re-renders                                  |

As we can see in the table above `react-hook-form` is a clear winner here. First of all, it is smaller in size.
Second of all, and this is an important one, `react-hook-form` does not re-render input components when value changes.
`Formik` has a big performance issue here. If I have a form with 10 input fields and I type 1 character in anyone of
the input fields I get 10*4 re-renders. That is 40 re-renders inside the field for each character I type. Comparing to `react-hook-form` which have a total of 0 re-renders for those 10 fields in my form.

### Formik
If we take a look at formiks github repository it has 31.6k stars so it is definetly a well established form-library.
On the contrary it haven't had a proper release since 2 June 2021 so it feels like it is slowly dying. The formik community
seems to have started the work on version 3 of formik but there was a long time ago version 3 had a alpha release as well.
`Formik` has 632 open issues at the time of writing.

I've always found it pretty weird to connect `formik` with `mui` and we use material-ui extensively in our ui.


### React hook form
The github repository looks very active with 32.1k stars. It latest release version `7.40.0` and it was released 8 days ago.
React hook form have 1 open issue at the time of writing. React hook forms have a really nice way of connecting `mui` field components to it's form. The simple `register` function that is exposed from the `useForm` hook makes it really easy. 
Just spread the props returned from `register` onto the component and you are good to go.

Both libraries supports `yup` for validating form fields.


## Conclusion
From this research it seems pretty obvious that we should use `react-hook-form` in favor of `formik`. In a migration from
`react-hook-form` to `formik` it is probably easiest to change all forms to use the `FormProvider` from `react-hook-form`
at first to make the transition easier. A lot of our forms have a somewhat deep component tree so the actual input-fields
are a few levels below all the UI-components that wraps them.
