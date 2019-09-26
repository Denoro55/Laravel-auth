<template>
	<div>
		<div class="settings pt-4">
			<div class="settings__section">
				<div class="settings__title mb-6 headline">Change your avatar</div>
				<div class="setting-avatar">
					<div class="setting-avatar__preview"
					     :style="{backgroundImage: `url(${avatarPreview})`}"
					>
					</div>
					<div class="setting-avatar__form">
						<v-form v-model="valid" ref="form">
							<v-file-input
									class="mb-2"
									v-model="fileImage"
									color="deep-purple accent-4"
									label="File input"
									placeholder="Pick your avatar"
									outlined
									accept="image/png, image/jpeg, image/bmp"
									prepend-icon="mdi-camera"
									@change="onImageChange"
									:show-size="1000"
									:rules="rules"
							>
								<template v-slot:selection="{ index, text }">
									<v-chip
											v-if="index < 2"
											color="deep-purple accent-4"
											dark
											label
											small
									>
										{{ text }}
									</v-chip>

									<span
											v-else-if="index === 2"
											class="overline grey--text text--darken-3 mx-2"
									>
        +{{ files.length - 2 }} File(s)
      </span>
								</template>
							</v-file-input>
							<v-btn :disabled="!valid" @click="uploadImage" class="success">Update avatar</v-btn>
						</v-form>
					</div>
				</div>
				<!--<input ref="file" type="file" v-on:change="onImageChange">-->
			</div>
		</div>
	</div>
</template>

<script>
	// import { mapMutations } from 'vuex';
	export default {
		data: () => ({
			valid: false,
			file: '',
			avatarPreview: '',
			fileImage: [],
			rules: [
				value => !value || value.type === 'image/jpeg' || value.type === 'image/png' || 'Select only images please!',
				value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
				value => !value || value.size > 100 || 'Avatar size should be more than 1 KB!',
				value => !!value || 'Avatar is required!'
			],
		}),
		methods: {
			onImageChange(e) {
				setTimeout(()=> {
					if (this.fileImage && this.valid) {
						let reader = new FileReader();
						let that = this;
						reader.onload = function (e) {
							that.avatarPreview = e.target.result;
						};
						reader.readAsDataURL(this.fileImage);
					} else {
						this.avatarPreview = '';
					}
				})
				// this.file = this.$refs.file.files[0];
			},
			uploadImage(){
				let formData = new FormData();
				// formData.append('file', this.fileImage[0]);
				formData.append('file', this.fileImage);
				formData.append('user_id', this.$store.state.auth.user.id);
				this.$axios.post('user/updateAvatar', formData, {headers: {
						'Content-Type': 'multipart/form-data'
					}} ).then(response => {
						console.log(response.data)
					// this.$store.state.auth.user.image_url = response.data;
					this.$refs.form.reset();
					this.$store.commit('auth/updateImage', response.data);
				});
			}
			// async updateAvatar() {
			// 	await this.$axios.$post('http://laravel-auth/api/auth/register', form, {headers: {
			// 			'Content-Type': 'multipart/form-data'
			// 		}});
			// }
		}
	}
</script>

<style lang="scss">
	.setting-avatar {
		&__preview {
			width: 100px;
			height: 100px;
			border: 1px solid #c0c0c0;
			margin-bottom: 25px;
			border-radius: 5px;
			background-size: cover;
			background-position: center center;
		}
	}
</style>