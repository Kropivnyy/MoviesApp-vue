<template>
  <form class="form" @submit.prevent="submitHandler">
    <div class="form-group">
      <label class="form-label" for="register-first-name">First name</label>
      <input
        class="form-control"
        :class="{ invalid: isInvalidFirstName }"
        v-model.trim="firstName"
        id="register-first-name"
        type="text"
        placeholder="Enter first name"
        autocomplete="off"
      />
      <small v-if="isInvalidFirstName" class="form-text"
        >Enter your actual first name.</small
      >
    </div>
    <div class="form-group">
      <label class="form-label" for="register-last-name">Last name</label>
      <input
        class="form-control"
        :class="{ invalid: isInvalidLastName }"
        v-model.trim="lastName"
        id="register-last-name"
        type="text"
        placeholder="Enter last name"
        autocomplete="off"
      />
      <small v-if="isInvalidLastName" class="form-text"
        >Enter your actual last name.</small
      >
    </div>
    <div class="form-group">
      <label class="form-label" for="register-email">Email</label>
      <input
        class="form-control"
        :class="{ invalid: isInvalidEmail }"
        v-model.trim="email"
        id="register-email"
        type="text"
        placeholder="Enter email"
        autocomplete="off"
      />
      <small v-if="isInvalidEmail" class="form-text"
        >Enter your actual email.</small
      >
    </div>
    <div class="form-group">
      <label class="form-label" for="register-password">Password</label>
      <input
        class="form-control"
        :class="{ invalid: isInvalidPassword }"
        v-model.trim="password"
        id="register-password"
        type="password"
        placeholder="Enter password"
      />
      <small v-if="isInvalidPassword" class="form-text"
        >Password must have at least
        {{ $v.password.$params.minLength.min }} characters. Now it's
        {{ password.length }}</small
      >
    </div>
    <div class="form-group">
      <label class="form-label" for="register-phone">Phone</label>
      <input
        class="form-control"
        :class="{ invalid: isInvalidPhone }"
        v-model.trim="phone"
        id="register-phone"
        type="tel"
        placeholder="Enter phone"
        autocomplete="off"
      />
      <small v-if="isInvalidPhone" class="form-text"
        >Phone must have at least {{ $v.phone.$params.minLength.min }} digits.
        Now it's {{ phone.length }}</small
      >
    </div>
    <div class="form-group form-check">
      <input
        class="form-check-input"
        v-model="checked"
        id="register-checkbox"
        type="checkbox"
      />
      <label class="form-check-label" for="register-checkbox"
        >I agree with private policy</label
      >
    </div>
    <button
      class="btn btn-primary"
      :class="{ disabled: $v.$invalid }"
      type="submit"
    >
      Register
    </button>
  </form>
</template>

<script>
import { email, required, minLength, numeric } from 'vuelidate/lib/validators';
import LSHelper from '@/utils/LSHelper';

export default {
  name: 'register',
  data: () => ({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    checked: false,
  }),

  validations: {
    firstName: {
      required,
      minLength: minLength(3),
    },

    lastName: {
      required,
      minLength: minLength(3),
    },

    email: {
      required,
      email,
    },

    password: {
      required,
      minLength: minLength(6),
    },

    phone: {
      required,
      numeric,
      minLength: minLength(7),
    },

    checked: {
      required,
      checked: value => value,
    },
  },

  computed: {
    isInvalidFirstName() {
      return (
        (this.$v.firstName.$dirty && !this.$v.firstName.required) ||
        (this.$v.firstName.$dirty && !this.$v.firstName.minLength)
      );
    },

    isInvalidLastName() {
      return (
        (this.$v.lastName.$dirty && !this.$v.lastName.required) ||
        (this.$v.lastName.$dirty && !this.$v.lastName.minLength)
      );
    },

    isInvalidEmail() {
      return (
        (this.$v.email.$dirty && !this.$v.email.required) ||
        (this.$v.email.$dirty && !this.$v.email.email)
      );
    },

    isInvalidPassword() {
      return (
        (this.$v.password.$dirty && !this.$v.password.required) ||
        (this.$v.password.$dirty && !this.$v.password.minLength)
      );
    },

    isInvalidPhone() {
      return (
        (this.$v.phone.$dirty && !this.$v.phone.required) ||
        (this.$v.phone.$dirty && !this.$v.phone.numeric) ||
        (this.$v.phone.$dirty && !this.$v.phone.minLength)
      );
    },
  },

  methods: {
    submitHandler() {
      if (this?.$v?.$invalid) {
        this.$v.$touch();
        return;
      }

      LSHelper.setToLS('user', this.firstName);
      this.$store.commit('loginUser', this.firstName);
      this.$router.push('/dashboard');
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 90%;
  max-width: 400px;
  margin: 0 auto;

  @media screen and (min-width: 768px) {
    width: 40%;
    min-width: 400px;
    max-width: unset;
  }
}

.form-group {
  margin-bottom: 1rem;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  &::placeholder {
    color: #6c757d;
    opacity: 1;
  }

  &.invalid {
    border-color: #dc3545;

    &:focus {
      border-color: #dc3545;
      box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    }
  }
}

.form-text {
  display: block;
  margin-top: 0.25rem;
  color: #dc3545;
}

.form-check {
  position: relative;
  display: block;
  padding-left: 1.25rem;
}

.form-check-input {
  position: absolute;
  margin-top: 0.3rem;
  margin-left: -1.25rem;
}

.form-check-label {
  display: inline-block;
  margin-bottom: 0;
}

.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn:hover,
.btn:focus {
  text-decoration: none;
}

.btn:focus,
.btn.focus {
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.btn.disabled,
.btn:disabled {
  opacity: 0.65;
}

.btn:not(:disabled):not(.disabled) {
  cursor: pointer;
}

.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}

.btn-primary:focus,
.btn-primary.focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
}

.btn-primary.disabled,
.btn-primary:disabled {
  background-color: #007bff;
  border-color: #007bff;
}
</style>
