<template>
	<div class="content row-fix">
		<template>
			<v-row align="center">
				<v-form
						ref="form"
						v-model="valid"
						:lazy-validation="lazy"
				>
					<v-text-field class="mb-3"
							v-model="name"
							:counter="10"
							:rules="nameRules"
							label="Name"
							required
					></v-text-field>

					<v-text-field class="mb-3"
							v-model="email"
							:rules="emailRules"
							label="E-mail"
							required
					></v-text-field>

					<v-alert v-if="errors.email" type="error">
						{{ errors.email[0] }}
					</v-alert>


					<v-text-field class="mb-3"
							v-model="password"
							label="Password"
							      :rules="passwordRules"
							required
					></v-text-field>


					<v-checkbox class="mb-4"
							v-model="checkbox"
							:rules="[v => !!v || 'You must agree to continue!']"
							label="Do you agree?"
							required
					></v-checkbox>

					<v-btn
							:disabled="!valid"
							color="success"
							class="mr-4"
							@click="register"
					>
						Validate
					</v-btn>

					<v-btn
							color="error"
							class="mr-4"
							@click="reset"
					>
						Reset Form
					</v-btn>

					<v-btn
							color="warning"
							@click.prevent="resetValidation"
					>
						Reset Validation
					</v-btn>
				</v-form>
			</v-row>
		</template>
	</div>
</template>

<script>
    export default {
		middleware: 'guest',
        data: () => ({
            valid: true,
            name: 'den55',
            nameRules: [
                v => !!v || 'Name is required',
				v => (v && v.length > 2) || 'Name must be more than 2 characters',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            email: 'den@mail.ru',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
			passwordRules: [
				v => !!v || 'Password is required',
				v => (v && v.length > 7) || 'Password must be more than 7 characters',
			],
            password: '12345678',
            items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4',
            ],
            checkbox: false,
            lazy: false,
        }),
        methods: {
            validate () {
                if (this.$refs.form.validate()) {
                    this.snackbar = true
                }
            },
            reset () {
                this.$refs.form.reset()
            },
            resetValidation () {
                this.$refs.form.resetValidation()
            },
	        async register(){
            	const form = {name: this.name, email: this.email, password: this.password};
				try {
					await this.$axios.$post('auth/register', form);
				} catch(e) {
					return;
				}
            	this.$auth.login({data: form});
            	this.$router.push({'name': 'index'});
	        }
        },
    }
</script>
