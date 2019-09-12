<template>
	<div class="pt-3">
		<template>
			<v-row class="pt-2" align="center">
				<v-form
						ref="form"
						v-model="valid"
						:lazy-validation="lazy"
				>
					<v-text-field
							:error="Boolean(errors.email)"
							v-model="email"
							:rules="emailRules"
							label="E-mail"
							required
					></v-text-field>

					<v-text-field
							:error="Boolean(errors.email)"
							v-model="password"
							label="Password"
							required
					></v-text-field>

					<v-btn
							color="success"
							class="mr-4"
							@click="login"
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
				v => (v && v.length <= 10) || 'Name must be less than 10 characters',
			],
			email: 'den@mail.ru',
			emailRules: [
				v => !!v || 'E-mail is required',
				v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
			],
			password: '12345678',
			items: [
				'Item 1',
				'Item 2',
				'Item 3',
				'Item 4',
			],

			lazy: false,
		}),
		methods: {
			validate() {
				if (this.$refs.form.validate()) {
					this.snackbar = true
				}
			},
			reset() {
				this.$refs.form.reset()
			},
			resetValidation() {
				this.$refs.form.resetValidation()
			},
			async login() {
				const form = {email: this.email, password: this.password};
				try {
					await this.$auth.login({data: form});
				} catch (e) {
					return;
				}
				this.$router.push({'name': 'index'});
			}
		},
	}
</script>
