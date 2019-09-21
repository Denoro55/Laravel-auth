<?php

namespace App\Http\Controllers\api;

use App\User;
use App\Article;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index(Request $request) {
        $user = User::where('id', $request->user_id)->first();
        $articles = Article::where('user_id', $request->user_id)->get();
        $data = [
            'user' => $user,
            'articles' => $articles
        ];
        return $data;
    }

    public function updateAvatar(Request $request) {
        $user = DB::table('users')->select('name')->where('id', $request->user_id)->first();
        $file = $request->file('file')->store("uploads/{$user->name}", 'public');
        DB::table('users')
            ->where('id', $request->user_id)
            ->update(['image_url' => $file]);
        return $file;
//        return $request->file->getClientMimeType();
//        $content = Storage::disk('csv')->get('file.csv');
    }
}
