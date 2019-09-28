<template>
	<div class="login-block content row-fix">
		<template>
			<v-row>
				<v-form
						ref="form"
						v-model="valid"
						:lazy-validation="lazy"
				>
					<v-text-field class="mb-3"
					              autocomplete="off"
					              :error="Boolean(errors.email)"
					              v-model="email"
					              :rules="emailRules"
					              label="E-mail"
					              required
					></v-text-field>

					<v-text-field class="mb-5"
					              autocomplete="off"
					              :error="Boolean(errors.email)"
					              v-model="password"
					              :rules="passwordRules"
					              label="Password"
					              required
					></v-text-field>

					<v-btn
							color="success"
							class="mr-4"
							@click="login"
							:disabled="!valid"
					>
						Login
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
			<!--{{ errors }}-->
		</template>
	</div>
</template>

<script>
	import { mapMutations } from 'vuex';
	export default {
		middleware: 'guest',
		data: () => ({
			valid: true,
			name: 'den55',
			email: 'den@mail.ru',
			emailRules: [
				v => !!v || 'E-mail is required',
				v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
			],
			password: '12345678',
			passwordRules: [
				v => !!v || 'Password is required',
				v => (v && v.length > 7) || 'Password must be more than 7 characters',
			],
			items: [
				'Item 1',
				'Item 2',
				'Item 3',
				'Item 4',
			],
			lazy: false,
		}),
		methods: {
			...mapMutations({
				setErrors: 'validation/SET_VALIDATION_ERRORS'
			}),
			validate() {
				if (this.$refs.form.validate()) {
					this.snackbar = true
				}
			},
			reset() {
				this.$refs.form.reset();
			},
			resetValidation() {
				this.$refs.form.resetValidation();
				this.setErrors([]);
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

<style lang="scss">
	.login-block {
		width: 500px;
	}
</style>