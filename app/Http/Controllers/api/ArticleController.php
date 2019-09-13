<?php

namespace App\Http\Controllers\api;

use App\Article;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\JWTAuth;

class ArticleController extends Controller
{

    protected $auth;

    public function __construct(JWTAuth $auth)
    {
        $this->auth = $auth;
    }

    public function index(Request $request)
    {
        return Article::where('user_id', $request->user_id)->get();
    }

    public function store(Request $request) // create new article
    {
        $article = new Article();
        $article->title = $request->title;
        $article->content = $request->content;
        $article->user_id = $request->user_id;
        $article->save();
        return [
            'success' => true
        ];
    }

    public function remove(Request $request) // create new article
    {
        $article = Article::findOrFail($request->article_id);
        $article->delete();
        return [
            'success' => true
        ];
    }
}
