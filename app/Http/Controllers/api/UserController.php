<?php

namespace App\Http\Controllers\api;

use App\User;
use App\Article;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
}
